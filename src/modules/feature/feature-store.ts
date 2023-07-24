import { Feature } from '@/modules/feature/feature'
import {
  initBoard,
  meanComplexity,
  meanLeadTime,
  meanQualityIssue,
  newBacklog,
  nextDay
} from '@/modules/feature/feature-board'
import { featureSteps } from '@/modules/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'
import { FeatureState, Meta } from '@/store-type'
import { clone } from '@/utils'
import { defineStore } from 'pinia'

const resetMeta = (): Meta => ({
  totalDays: 0,
  daysWithProblemSolving: 0,
  strategy: {
    push: 0,
    pull: 0,
    'problem-solving': 0
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
    async initBoard() {
      this.backlog = newBacklog()
      this.steps = featureSteps
      this.features = initBoard(clone(this.steps), clone(this.backlog))

      this.backlog = this.backlog.filter(
        (l) => !this.features.find((f) => f.name === l.name)
      )
      this.meta = resetMeta()
    },
    async nextDay(strategy: Strategy) {
      const newState = nextDay(clone(this.$state), strategy)

      this.backlog = newState.backlog
      this.meta = newState.meta
      this.features = newState.features
    }
  },
  getters: {
    meanComplexity: (state) => meanComplexity(state.features),
    meanLeadTime: (state) => meanLeadTime(state.features),
    meanQualityIssue: (state) => meanQualityIssue(state.features),
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
