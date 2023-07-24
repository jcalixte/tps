import { featureSteps } from '@/modules/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'
import { Dashboard, Meta } from '@/store-type'
import { defineStore } from 'pinia'

type State = {
  dashboards: Dashboard[]
}

const instance = new ComlinkWorker<typeof import('../feature/feature-board')>(
  new URL('../feature/feature-board', import.meta.url)
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

export const useDashboardStore = defineStore('dashboard', {
  state: (): State => {
    return {
      dashboards: []
    }
  },
  actions: {
    newDashboard(dashboard: Dashboard) {
      this.dashboards.push(dashboard)
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

      this.newDashboard({
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
    },
    clearDashboard() {
      this.dashboards = []
    }
  }
})
