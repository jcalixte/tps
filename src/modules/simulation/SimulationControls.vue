<script setup lang="ts">
import { Strategy } from '@/modules/lean/strategy'
import { useSimulationStore } from '@/modules/simulation/simulation-store'
const simulationStore = useSimulationStore()
const NUMBER_OF_SIMULATION = 400

const strategies: Strategy[] = ['push', 'pull', 'push-dps', 'pull-dps']

const simulateEverything = () => {
  strategies.forEach((strategy) =>
    simulationStore.multiSimulation(NUMBER_OF_SIMULATION, strategy)
  )
}
</script>

<template>
  <div class="simulation-controls">
    <div class="row">
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
      <button
        class="button button-outline"
        @click="simulationStore.multiSimulation(1, 'push-dps')"
      >
        simulate push with DPS
      </button>
      <button
        class="button button-outline"
        @click="simulationStore.multiSimulation(1, 'pull-dps')"
      >
        simulate pull with DPS
      </button>
    </div>
    <div class="row">
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
