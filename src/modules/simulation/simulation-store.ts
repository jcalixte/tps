import { featureSteps } from '@/modules/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'
import { Dashboard, Meta } from '@/store-type'
import { getMean } from '@/utils'
import { defineStore } from 'pinia'

type State = {
  dashboards: Dashboard[]
  requestedSimulation: number
  simulationsDone: number
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

export const useSimulationStore = defineStore('dashboard', {
  state: (): State => {
    return {
      dashboards: [],
      requestedSimulation: 0,
      simulationsDone: 0
    }
  },
  actions: {
    newDashboard(dashboard: Dashboard) {
      this.dashboards.push(dashboard)
    },
    async simulate(strategy: Strategy) {
      const steps = featureSteps
      const backlog = await instance.newBacklog()
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
          meanComplexity: await instance.getMeanComplexity(newState.features),
          meanLeadTime: await instance.getMeanLeadTime(newState.features),
          meanQualityIssue: await instance.getMeanQualityIssue(
            newState.features
          ),
          worstFeature,
          strategy
        }
      })
    },
    async multiSimulation(simulations: number, strategy: Strategy) {
      this.requestedSimulation += simulations
      for (let i = 0; i < simulations; i++) {
        await this.simulate(strategy)
        this.simulationsDone++
      }
    },
    clearDashboard() {
      this.dashboards = []
    }
  },
  getters: {
    meanPushLeadTime: (state) => {
      return getMean(
        state.dashboards
          .filter((dashboard) => dashboard.analysis.strategy === 'push')
          .map((dashboard) => dashboard.analysis.meanLeadTime)
      )
    },
    meanPullLeadTime: (state) => {
      return getMean(
        state.dashboards
          .filter((dashboard) => dashboard.analysis.strategy === 'pull')
          .map((dashboard) => dashboard.analysis.meanLeadTime)
      )
    },
    meanPullDPSLeadTime: (state) => {
      return getMean(
        state.dashboards
          .filter(
            (dashboard) => dashboard.analysis.strategy === 'problem-solving'
          )
          .map((dashboard) => dashboard.analysis.meanLeadTime)
      )
    }
  }
})
