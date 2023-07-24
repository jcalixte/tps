<script setup lang="ts">
import { useSimulationStore } from '@/modules/simulation/simulation-store'

const simulationStore = useSimulationStore()
</script>

<template>
  <div class="simulation-dashboard">
    Dashboard ({{ simulationStore.simulationsDone }} /
    {{ simulationStore.requestedSimulation }}
    simulations)
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>push</th>
          <th>pull</th>
          <th>pull and DPS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>lead time</td>
          <td>
            {{ simulationStore.meanPushLeadTime }}
          </td>
          <td>
            {{ simulationStore.meanPullLeadTime }}
          </td>
          <td>
            {{ simulationStore.meanPullDPSLeadTime }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.simulation-dashboard {
  color: var(--background-color);
}
</style>
