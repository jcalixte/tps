import { Feature } from '@/modules/feature/feature'
import {
  meanComplexity,
  meanLeadTime,
  meanQualityIssue
} from '@/modules/feature/feature-board'
import { featureSteps } from '@/modules/feature/feature-steps'
import { Meta, State } from '@/modules/feature/store-type'
import { Strategy } from '@/modules/lean/strategy'
import { defineStore } from 'pinia'

const clone = (data: any) => JSON.parse(JSON.stringify(data))

const instance = new ComlinkWorker<typeof import('./feature-board')>(
  new URL('./feature-board', import.meta.url)
)

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
    async initBoard() {
      const newBoard = await instance.newBoard()

      this.backlog = newBoard
      this.steps = featureSteps
      this.features = await instance.initBoard(
        clone(this.steps),
        clone(this.backlog)
      )

      this.backlog = this.backlog.filter(
        (l) => !this.features.find((f) => f.name === l.name)
      )
      this.meta = resetMeta()
    },
    async nextDay(strategy: Strategy) {
      const newState = await instance.nextDay(clone(this.$state), strategy)

      this.backlog = newState.backlog
      this.meta = newState.meta
      this.features = newState.features
    },
    async simulate(strategy: Strategy) {
      await this.initBoard()

      const newState = await instance.simulate(clone(this.$state), strategy)

      const [worstFeature] = newState.features.sort((a, b) =>
        a.qualityIssue > b.qualityIssue ? -1 : 1
      )

      this.dashboards.push({
        uuid: new Date().getTime().toString(),
        meta: newState.meta,
        analysis: {
          meanComplexity: await instance.meanComplexity(newState.features),
          meanLeadTime: await instance.meanLeadTime(newState.features),
          meanQualityIssue: await instance.meanQualityIssue(newState.features),
          worstFeature,
          mainStrategy: Object.entries(newState.meta.strategy).sort((a, b) =>
            a[1] > b[1] ? -1 : 1
          )[0][0]
        }
      })
      await this.initBoard()
    },
    clearDashboard() {
      this.dashboards = []
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
