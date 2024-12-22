import { Feature } from '@/modules/pull-system/feature/feature'
import {
  getMeanComplexity,
  getMeanLeadTime,
  getMeanQualityIssue,
  initBoard,
  isFeatureDone,
  isProjectFinished,
  newBacklog,
  nextDay
} from '@/modules/pull-system/feature/feature-board'
import { featureSteps } from '@/modules/pull-system/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'
import { FeatureState, Meta } from '@/store-type'
import { defineStore } from 'pinia'

const resetMeta = (): Meta => ({
  totalDays: 0,
  teamWorkExperience: 0,
  featuresDonePerDay: [],
  strategy: {
    push: 0,
    pull: 0,
    'pull-dps': 0,
    'push-dps': 0
  }
})

export const useFeatureStore = defineStore('feature', {
  state: (): FeatureState => ({
    steps: [],
    features: [],
    backlog: [],
    meta: resetMeta()
  }),
  actions: {
    async initBoard(limit?: number) {
      this.backlog = newBacklog(limit)
      this.steps = featureSteps
      this.features = initBoard(this.steps, this.backlog)

      this.backlog = this.backlog.filter(
        (l) => !this.features.find((f) => f.name === l.name)
      )
      this.meta = resetMeta()
    },
    async nextDay(strategy: Strategy | 'problem-solving') {
      const newState = nextDay(this.$state, strategy)

      this.backlog = newState.backlog
      this.meta = newState.meta
      this.features = newState.features
    }
  },
  getters: {
    isProjectFinished: (state) => isProjectFinished(state.features),
    meanComplexity: (state) => getMeanComplexity(state.features),
    meanLeadTime: (state) => getMeanLeadTime(state.features),
    meanQualityIssue: (state) => getMeanQualityIssue(state.features),
    taktTime: (state): string =>
      (
        state.meta.totalDays / state.features.filter(isFeatureDone).length || 0
      ).toFixed(2),
    featuresGroupedByStep: (state) => {
      const groupedByStep: Record<number, Feature[]> = {}

      state.features.forEach((feature) => {
        if (!groupedByStep[feature.step]) {
          groupedByStep[feature.step] = [feature]
        } else {
          groupedByStep[feature.step].push(feature)
        }
      })

      return groupedByStep
    },
    eat(): string {
      return (
        parseFloat(this.taktTime) *
        (this.features.filter((feature) => !isFeatureDone(feature)).length +
          this.backlog.length)
      ).toFixed(2)
    },
    totalFeaturesCount: (state) => state.backlog.length + state.features.length,
    totalFeaturesDone: (state) =>
      state.features.filter((feature) => isFeatureDone(feature)).length
  }
})
