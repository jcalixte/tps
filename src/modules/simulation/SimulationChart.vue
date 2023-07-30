<script setup lang="ts">
import { useSimulationStore } from '@/modules/simulation/simulation-store'
import { popNElement } from '@/utils'
import chartXkcd from 'chart.xkcd'
import { onMounted, ref, watch } from 'vue'

const simulationStore = useSimulationStore()
const SAMPLE = 15
const svgElement = ref<HTMLInputElement | null>(null)
const isChartInit = ref(false)

const reloadGraph = () => {
  if (simulationStore.dashboards.length === 0) {
    return
  }

  isChartInit.value = true

  if (!svgElement.value) {
    return
  }

  const samples = popNElement(
    [...simulationStore.dashboards],
    SAMPLE
  ).toReversed()

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
  new chartXkcd.Line(svgElement.value, config)
}

watch(() => simulationStore.hasSimulationFinished, reloadGraph)
watch(svgElement, reloadGraph)
onMounted(reloadGraph)
</script>

<template>
  <div class="simulation-chart">
    <div v-if="!isChartInit" class="chart no-init">
      Chart appears once every simulations resume
    </div>
    <svg ref="svgElement" v-else class="chart"></svg>
  </div>
</template>

<style scoped lang="scss">
.simulation-chart {
  --chart-height: 80vh;
  height: var(--chart-height);
}

.chart {
  width: 80vw;
  height: var(--chart-height);
}

.no-init {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
