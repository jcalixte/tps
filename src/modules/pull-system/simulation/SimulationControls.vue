<script setup lang="ts">
import type { Strategy } from '@/modules/pull-system/lean/strategy'
import { useSimulationStore } from '@/modules/pull-system/simulation/simulation-store'

defineProps<{
  type: 'single' | 'multiple'
}>()

const simulationStore = useSimulationStore()
const NUMBER_OF_SIMULATION = 500

// [dps]
// const strategies: Strategy[] = ['push', 'pull', 'push-dps', 'pull-dps']
const strategies: Strategy[] = ['push', 'pull']

const simulateEverything = () => {
  strategies.forEach((strategy) =>
    simulationStore.multiSimulation(NUMBER_OF_SIMULATION, strategy)
  )
}
</script>

<template>
  <div class="simulation-controls">
    <div class="row" v-if="type === 'single'">
      <button
        class="button button-outline"
        @click="simulationStore.multiSimulation(1, 'push')"
      >
        simulate push system
      </button>
      <button
        class="button button-outline"
        @click="simulationStore.multiSimulation(1, 'pull')"
      >
        simulate pull system
      </button>
      <!-- [dps]
      <button
        class="button button-outline"
        @click="simulationStore.multiSimulation(1, 'push-dps')"
      >
        simulate push with problem solving
      </button>
      <button
        class="button button-outline"
        @click="simulationStore.multiSimulation(1, 'pull-dps')"
      >
        simulate pull with problem solving
      </button> -->
    </div>
    <div class="row" v-else-if="type === 'multiple'">
      <button class="button button-outline" @click="simulateEverything">
        simulate {{ NUMBER_OF_SIMULATION }} simulations for each system
      </button>
      <button
        class="button button-clear"
        @click="simulationStore.clearDashboard()"
      >
        clear dashboard
      </button>
    </div>
  </div>
</template>
