<script setup lang="ts">
import { Strategy } from '@/modules/lean/strategy'
import { useSimulationStore } from '@/modules/simulation/simulation-store'

const simulationStore = useSimulationStore()

const strategies: Strategy[] = ['push', 'pull', 'push-dps', 'pull-dps']
</script>

<template>
  <div class="simulation-dashboard">
    <h3>Simulation dashboard</h3>
    <h4>
      ({{ simulationStore.simulationsDone }} /
      {{ simulationStore.requestedSimulation }}
      simulations)
    </h4>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th class="numeric">push</th>
          <th class="numeric">pull</th>
          <th class="numeric">pull and DPS</th>
          <th class="numeric">push and DPS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>lead time</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanLeadTime(strategy) }}
          </td>
        </tr>
        <tr>
          <td>takt time</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanTaktTime(strategy) }}
          </td>
        </tr>
        <tr>
          <td>Complexity</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanComplexity(strategy) }}
          </td>
        </tr>
        <tr>
          <td>Quality issue</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanQuality(strategy) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.simulation-dashboard {
  color: var(--primary-color);

  table {
    padding: 1rem;
  }
}

.numeric {
  text-align: right;
}
</style>
