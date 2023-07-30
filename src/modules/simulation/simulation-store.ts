import { featureSteps } from '@/modules/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'
import { Dashboard, Meta } from '@/store-type'
import { getRound } from '@/utils'
import { defineStore } from 'pinia'

type Mean = {
  leadTimeSum: number
  taktTimeSum: number
  complexitySum: number
  qualityIssueSum: number
  teamWorkExperienceSum: number
  totalDaysSum: number
  simulations: number
}

type State = {
  dashboards: Dashboard[]
  requestedSimulation: number
  simulationsDone: number
  mean: Record<Strategy, Mean>
}

const newMean = (): Mean => ({
  leadTimeSum: 0,
  taktTimeSum: 0,
  complexitySum: 0,
  qualityIssueSum: 0,
  teamWorkExperienceSum: 0,
  totalDaysSum: 0,
  simulations: 0
})

const instance = new ComlinkWorker<typeof import('../feature/feature-board')>(
  new URL('../feature/feature-board', import.meta.url)
)

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

export const useSimulationStore = defineStore('dashboard', {
  state: (): State => {
    return {
      dashboards: [],
      requestedSimulation: 0,
      simulationsDone: 0,
      mean: {
        push: newMean(),
        pull: newMean(),
        'pull-dps': newMean(),
        'push-dps': newMean()
      }
    }
  },
  actions: {
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

      const dashboard: Dashboard = {
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
      }

      this.dashboards.push(dashboard)
      this.mean[strategy].leadTimeSum += dashboard.analysis.meanLeadTime
      this.mean[strategy].taktTimeSum +=
        dashboard.meta.totalDays / newState.features.length
      this.mean[strategy].complexitySum += dashboard.analysis.meanComplexity
      this.mean[strategy].qualityIssueSum += dashboard.analysis.meanQualityIssue
      this.mean[strategy].teamWorkExperienceSum +=
        dashboard.meta.teamWorkExperience
      this.mean[strategy].totalDaysSum += dashboard.meta.totalDays
      this.mean[strategy].simulations++
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
      this.mean.push = newMean()
      this.mean.pull = newMean()
      this.mean['pull-dps'] = newMean()
      this.mean['push-dps'] = newMean()
    }
  },
  getters: {
    meanLeadTime: (state) => (strategy: Strategy) =>
      getRound(
        state.mean[strategy].leadTimeSum,
        state.mean[strategy].simulations
      ),
    meanTaktTime: (state) => (strategy: Strategy) =>
      getRound(
        state.mean[strategy].taktTimeSum,
        state.mean[strategy].simulations
      ),
    meanComplexity: (state) => (strategy: Strategy) =>
      getRound(
        state.mean[strategy].complexitySum,
        state.mean[strategy].simulations
      ),
    meanQuality: (state) => (strategy: Strategy) =>
      getRound(
        state.mean[strategy].qualityIssueSum,
        state.mean[strategy].simulations
      ),
    meanTeamWorkExperience: (state) => (strategy: Strategy) =>
      getRound(
        state.mean[strategy].teamWorkExperienceSum,
        state.mean[strategy].simulations
      ),
    meanTotalDays: (state) => (strategy: Strategy) =>
      getRound(
        state.mean[strategy].totalDaysSum,
        state.mean[strategy].simulations
      ),
    hasSimulationFinished: (state) =>
      state.requestedSimulation > 0 &&
      state.requestedSimulation === state.simulationsDone
  }
})
