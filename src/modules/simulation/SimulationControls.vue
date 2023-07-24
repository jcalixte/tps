<script setup lang="ts">
import { useSimulationStore } from '@/modules/simulation/simulation-store'
const simulationStore = useSimulationStore()
const NUMBER_OF_SIMULATION = 300
</script>

<template>
  <div class="simulation-controls">
    <button @click="simulationStore.simulate('push')">
      simulate push system
    </button>
    <button @click="simulationStore.simulate('pull')">
      simulate pull system
    </button>
    <button @click="simulationStore.simulate('problem-solving')">
      simulate pull and problem solving
    </button>
    <button
      @click="simulationStore.multiSimulation(NUMBER_OF_SIMULATION, 'push')"
    >
      simulate {{ NUMBER_OF_SIMULATION }} push system
    </button>
    <button
      @click="simulationStore.multiSimulation(NUMBER_OF_SIMULATION, 'pull')"
    >
      simulate {{ NUMBER_OF_SIMULATION }} pull system
    </button>
    <button
      @click="
        simulationStore.multiSimulation(NUMBER_OF_SIMULATION, 'problem-solving')
      "
    >
      simulate {{ NUMBER_OF_SIMULATION }} pull and problem solving
    </button>
    <button @click="simulationStore.clearDashboard()">clear dashboard</button>
  </div>
</template>
