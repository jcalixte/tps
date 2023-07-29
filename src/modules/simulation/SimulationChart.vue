<script setup lang="ts">
import { useSimulationStore } from '@/modules/simulation/simulation-store'
import chartXkcd from 'chart.xkcd'
import { onMounted } from 'vue'

const simulationStore = useSimulationStore()

const reloadGraph = () => {
  if (
    simulationStore.dashboards.length === 0 ||
    simulationStore.dashboards.length > 15
  ) {
    return
  }

  const svg = document.querySelector('.chart')
  const config = {
    title: 'Features done per day',
    xLabel: 'days',
    yLabel: 'features done',
    data: {
      labels: Array.from(
        {
          length: Math.max(
            ...simulationStore.dashboards.map(
              (dashboard) => dashboard.meta.totalDays
            )
          )
        },
        (_, index) => index + 1
      ),
      datasets: simulationStore.dashboards.map((dashboard, index) => ({
        label: `${dashboard.analysis.strategy} ${index + 1}`,
        data: dashboard.meta.featuresDonePerDay
      }))
    },
    options: {
      showLegend: false
    }
  }
  new chartXkcd.Line(svg, config)
}

// watch(simulationStore.dashboards, reloadGraph)
onMounted(reloadGraph)
</script>

<template>
  <div class="simulation-chart">
    <svg class="chart"></svg>
  </div>
</template>

<style scoped lang="scss">
.chart {
  width: 80vw;
  height: 100vh;
}
</style>
