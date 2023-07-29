<script setup lang="ts">
import { useSimulationStore } from '@/modules/simulation/simulation-store'
import { popNElement } from '@/utils'
import chartXkcd from 'chart.xkcd'
import { onMounted, ref, watch } from 'vue'

const simulationStore = useSimulationStore()
const SAMPLE = 15
const isChartInit = ref(false)

const reloadGraph = () => {
  if (simulationStore.dashboards.length === 0) {
    return
  }
  isChartInit.value = true

  const samples = popNElement(
    [...simulationStore.dashboards],
    SAMPLE
  ).toReversed()

  const svg = document.querySelector('svg.chart')
  const config = {
    title: `${SAMPLE} simulations`,
    xLabel: 'days',
    yLabel: 'features done',
    data: {
      labels: Array.from(
        {
          length: Math.max(
            ...samples.map((dashboard) => dashboard.meta.totalDays)
          )
        },
        (_, index) => index + 1
      ),
      datasets: samples.map((dashboard, index) => ({
        label: `${dashboard.analysis.strategy} ${index + 1}`,
        data: dashboard.meta.featuresDonePerDay
      }))
    },
    options: {
      showLegend: false,
      fontFamily: 'Noto Serif'
    }
  }
  new chartXkcd.Line(svg, config)
}

watch(() => simulationStore.hasSimulationFinished, reloadGraph)
onMounted(reloadGraph)
</script>

<template>
  <div class="simulation-chart">
    <svg class="chart"></svg>
    <div v-if="!isChartInit" class="chart no-init">
      Chart appears once every simulations resume
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart {
  width: 80vw;
  height: 100vh;
}

.no-init {
  position: relative;
  top: -100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
