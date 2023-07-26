import { Feature } from '@/modules/feature/feature'
import {
  getMeanComplexity,
  getMeanLeadTime,
  getMeanQualityIssue,
  initBoard,
  newBacklog,
  nextDay
} from '@/modules/feature/feature-board'
import { featureSteps } from '@/modules/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'
import { FeatureState, Meta } from '@/store-type'
import { sumElements } from '@/utils'
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
    // set the number of feature we want
    async initBoard() {
      this.backlog = newBacklog()
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
    meanComplexity: (state) => getMeanComplexity(state.features),
    meanLeadTime: (state) => getMeanLeadTime(state.features),
    meanQualityIssue: (state) => getMeanQualityIssue(state.features),
    taktTime: (state) =>
      (
        state.meta.totalDays / sumElements(state.meta.featuresDonePerDay)
      ).toFixed(2) ?? 0,
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
    }
  }
})
