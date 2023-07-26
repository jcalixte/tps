import { featureSteps } from '@/modules/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'
import { Dashboard, Meta } from '@/store-type'
import { getRound } from '@/utils'
import { defineStore } from 'pinia'

type Mean = {
  leadTimeSum: number
  complexitySum: number
  qualityIssueSum: number
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
  complexitySum: 0,
  qualityIssueSum: 0,
  simulations: 0
})

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
      simulationsDone: 0,
      mean: {
        push: newMean(),
        pull: newMean(),
        'problem-solving': newMean()
      }
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

      this.newDashboard(dashboard)
      this.mean[strategy].leadTimeSum += dashboard.analysis.meanLeadTime
      this.mean[strategy].complexitySum += dashboard.analysis.meanComplexity
      this.mean[strategy].qualityIssueSum += dashboard.analysis.meanQualityIssue
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
      this.mean['problem-solving'] = newMean()
    }
  },
  getters: {
    meanPushLeadTime: (state) => {
      return getRound(state.mean.push.leadTimeSum, state.mean.push.simulations)
    },
    meanPullLeadTime: (state) => {
      return getRound(state.mean.pull.leadTimeSum, state.mean.pull.simulations)
    },
    meanPullDPSLeadTime: (state) => {
      return getRound(
        state.mean['problem-solving'].leadTimeSum,
        state.mean['problem-solving'].simulations
      )
    },
    meanPushComplexity: (state) => {
      return getRound(
        state.mean.push.complexitySum,
        state.mean.push.simulations
      )
    },
    meanPullComplexity: (state) => {
      return getRound(
        state.mean.pull.complexitySum,
        state.mean.pull.simulations
      )
    },
    meanPullDPSComplexity: (state) => {
      return getRound(
        state.mean['problem-solving'].complexitySum,
        state.mean['problem-solving'].simulations
      )
    },
    meanPushQuality: (state) => {
      return getRound(
        state.mean.push.qualityIssueSum,
        state.mean.push.simulations
      )
    },
    meanPullQuality: (state) => {
      return getRound(
        state.mean.pull.qualityIssueSum,
        state.mean.pull.simulations
      )
    },
    meanPullDPSQuality: (state) => {
      return getRound(
        state.mean['problem-solving'].qualityIssueSum,
        state.mean['problem-solving'].simulations
      )
    }
  }
})
