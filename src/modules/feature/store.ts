import { Feature } from '@/modules/feature/feature'
import { initBoard, newBoard, nextDay } from '@/modules/feature/feature-board'
import { FeatureStep, featureSteps } from '@/modules/feature/feature-steps'
import { sumElements } from '@/utils'
import { defineStore } from 'pinia'

type State = {
  steps: FeatureStep[]
  features: Feature[]
  backlog: Feature[]
  meta: {
    totalDays: number
  }
}

export const useFeatureStore = defineStore('feature', {
  state: (): State => ({
    steps: [],
    features: [],
    backlog: [],
    meta: {
      totalDays: 0
    }
  }),
  actions: {
    initBoard() {
      this.backlog = newBoard()
      this.steps = featureSteps
      this.features = initBoard(this.steps, this.backlog)
      this.meta.totalDays = 0
    },
    nextDay() {
      this.features = nextDay({
        backlog: this.backlog,
        features: this.features,
        initialStep: this.steps[0].stepIndex
      })
      this.meta.totalDays++
    }
  },
  getters: {
    meanComplexity: (state) => {
      return (
        Math.round(
          100 *
            (sumElements(state.features.map((feature) => feature.complexity)) /
              state.features.length)
        ) / 100
      )
    },
    meanLeadTime: (state) => {
      return (
        Math.round(
          100 *
            (sumElements(state.features.map((feature) => feature.leadTime)) /
              state.features.length)
        ) / 100
      )
    },
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
