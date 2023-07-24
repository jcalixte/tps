import { Dashboard } from '@/store-type'
import { defineStore } from 'pinia'

type State = {
  dashboards: Dashboard[]
}

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
    clearDashboard() {
      this.dashboards = []
    }
  }
})
