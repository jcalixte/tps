import { Feature } from '@/modules/feature/feature'
import { initBoard, newBoard, nextDay } from '@/modules/feature/feature-board'
import { FeatureStep, featureSteps } from '@/modules/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'
import { sumElements } from '@/utils'
import { defineStore } from 'pinia'

type Meta = {
  totalDays: number
  daysWithProblemSolving: number
  strategy: Record<Strategy, number>
}

type Analysis = {
  worstFeature: Feature
  meanQualityIssue: number
  meanComplexity: number
  meanLeadTime: number
  mainStrategy: Strategy | string
}

type Dashboard = Array<{
  uuid: string
  meta: Meta
  analysis: Analysis
}>

type State = {
  steps: FeatureStep[]
  features: Feature[]
  backlog: Feature[]
  meta: Meta
  dashboards: Dashboard
}

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
  state: (): State => ({
    steps: [],
    features: [],
    backlog: [],
    meta: resetMeta(),
    dashboards: []
  }),
  actions: {
    initBoard() {
      this.backlog = newBoard()
      this.steps = featureSteps
      this.features = initBoard(this.steps, this.backlog)
      this.meta = resetMeta()
    },
    nextDay(strategy: Strategy) {
      this.meta.totalDays++
      this.meta.strategy[strategy]++

      if (strategy === 'problem-solving') {
        this.meta.daysWithProblemSolving++
      }

      this.features = nextDay({
        backlog: this.backlog,
        features: this.features,
        steps: this.steps,
        initialStep: this.steps[0].stepIndex,
        strategy,
        daysWithProblemSolving: this.meta.daysWithProblemSolving
      })
    },
    simulate(strategy: Strategy) {
      this.initBoard()
      while (!this.isProjectFinished) {
        if (strategy === 'problem-solving') {
          if (this.meta.totalDays % 5 === 0) {
            this.nextDay('problem-solving')
          } else {
            this.nextDay('pull')
          }
        } else {
          this.nextDay(strategy)
        }
      }
      const [worstFeature] = this.features.sort((a, b) =>
        a.qualityIssue > b.qualityIssue ? -1 : 1
      )

      this.dashboards.push({
        uuid: new Date().getTime().toString(),
        meta: this.meta,
        analysis: {
          meanComplexity: this.meanComplexity,
          meanLeadTime: this.meanLeadTime,
          meanQualityIssue: this.meanQualityIssue,
          worstFeature,
          mainStrategy: Object.entries(this.meta.strategy).sort((a, b) =>
            a[1] > b[1] ? -1 : 1
          )[0][0]
        }
      })
    },
    clearDashboard() {
      this.dashboards = []
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
    meanQualityIssue: (state) => {
      return (
        Math.round(
          100 *
            (sumElements(
              state.features.map((feature) => feature.qualityIssue)
            ) /
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
    },
    isProjectFinished: (state) =>
      state.features.every(
        (feature) => feature.step === 0 && feature.status === 'done'
      )
  }
})
