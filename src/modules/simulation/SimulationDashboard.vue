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
        <tr>
          <td>Complexity</td>
          <td>
            {{ simulationStore.meanPushComplexity }}
          </td>
          <td>
            {{ simulationStore.meanPullComplexity }}
          </td>
          <td>
            {{ simulationStore.meanPullDPSComplexity }}
          </td>
        </tr>
        <tr>
          <td>Quality issue</td>
          <td>
            {{ simulationStore.meanPushQuality }}
          </td>
          <td>
            {{ simulationStore.meanPullQuality }}
          </td>
          <td>
            {{ simulationStore.meanPullDPSQuality }}
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
