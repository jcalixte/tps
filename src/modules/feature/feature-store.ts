import { useDashboardStore } from '@/modules/dashboard/dashboard-store'
import { Feature } from '@/modules/feature/feature'
import {
  meanComplexity,
  meanLeadTime,
  meanQualityIssue
} from '@/modules/feature/feature-board'
import { featureSteps } from '@/modules/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'
import { FeatureState, Meta } from '@/store-type'
import { clone } from '@/utils'
import { defineStore } from 'pinia'

const dashboardStore = useDashboardStore()

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
  state: (): FeatureState => ({
    steps: [],
    features: [],
    backlog: [],
    meta: resetMeta()
  }),
  actions: {
    async initBoard() {
      const newBacklog = await instance.newBacklog()
      this.backlog = newBacklog
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
      const backlog = await instance.newBacklog()
      const steps = featureSteps
      const features = await instance.initBoard(steps, backlog)

      const newState = await instance.simulate(
        {
          backlog,
          steps,
          features,
          meta: resetMeta()
        },
        strategy
      )

      const [worstFeature] = newState.features.sort((a, b) =>
        a.qualityIssue > b.qualityIssue ? -1 : 1
      )

      dashboardStore.newDashboard({
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
    },
    async simulate100(strategy: Strategy) {
      for (let i = 0; i < 100; i++) {
        await this.simulate(strategy)
      }
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
