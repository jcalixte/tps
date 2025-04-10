/// <reference types="vite-plugin-comlink/client" />

import { featureSteps } from '@/modules/pull-system/feature/feature-steps'
import type { Strategy } from '@/modules/pull-system/lean/strategy'
import type { Dashboard, Meta } from '@/store-type'
import { getRound } from '@/utils'
import { defineStore } from 'pinia'

type Mean = {
  leadTimeSum: number
  cycleTimeSum: number
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

const initMean = (): Mean => ({
  leadTimeSum: 0,
  cycleTimeSum: 0,
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
        push: initMean(),
        pull: initMean(),
        'pull-dps': initMean(),
        'push-dps': initMean()
      }
    }
  },
  actions: {
    async simulate(strategy: Strategy) {
      const steps = featureSteps
      const backlog = await instance.newBacklog('mobile-app')
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
      this.mean[strategy].cycleTimeSum +=
        dashboard.meta.totalDays / newState.features.length
      this.mean[strategy].complexitySum += dashboard.analysis.meanComplexity
      this.mean[strategy].qualityIssueSum += dashboard.analysis.meanQualityIssue
      // this.mean[strategy].teamWorkExperienceSum +=
      //   dashboard.meta.teamWorkExperience
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
      this.mean.push = initMean()
      this.mean.pull = initMean()
      this.mean['pull-dps'] = initMean()
      this.mean['push-dps'] = initMean()
      this.simulationsDone = 0
      this.requestedSimulation = 0
    }
  },
  getters: {
    meanLeadTime: (state) => (strategy: Strategy) =>
      getRound(
        state.mean[strategy].leadTimeSum,
        state.mean[strategy].simulations
      ),
    meanCycleTime: (state) => (strategy: Strategy) =>
      getRound(
        state.mean[strategy].cycleTimeSum,
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
