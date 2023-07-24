<script setup lang="ts">
import FeatureSteps from '@/modules/feature/FeatureSteps.vue'
import SimulationControls from '@/modules/simulation/SimulationControls.vue'
import SimulationDashboard from '@/modules/simulation/SimulationDashboard.vue'
import { StarportCarrier } from 'vue-starport'
</script>

<template>
  <main id="main-app">
    <StarportCarrier>
      <FeatureSteps />
    </StarportCarrier>
    <SimulationControls />
    <SimulationDashboard />
  </main>
</template>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 2 * 1rem);
}
</style>
