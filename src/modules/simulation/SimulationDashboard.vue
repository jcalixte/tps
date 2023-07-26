<script setup lang="ts">
import { useSimulationStore } from '@/modules/simulation/simulation-store'

const simulationStore = useSimulationStore()
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
          <th>push</th>
          <th>pull</th>
          <th>pull and DPS</th>
          <th>push and DPS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>lead time</td>
          <td class="numeric">
            {{ simulationStore.meanPushLeadTime }}
          </td>
          <td class="numeric">
            {{ simulationStore.meanPullLeadTime }}
          </td>
          <td class="numeric">
            {{ simulationStore.meanPullDPSLeadTime }}
          </td>
          <td class="numeric">
            {{ simulationStore.meanPushDPSLeadTime }}
          </td>
        </tr>
        <tr>
          <td>Complexity</td>
          <td class="numeric">
            {{ simulationStore.meanPushComplexity }}
          </td>
          <td class="numeric">
            {{ simulationStore.meanPullComplexity }}
          </td>
          <td class="numeric">
            {{ simulationStore.meanPullDPSComplexity }}
          </td>
          <td class="numeric">
            {{ simulationStore.meanPushDPSComplexity }}
          </td>
        </tr>
        <tr>
          <td>Quality issue</td>
          <td class="numeric">
            {{ simulationStore.meanPushQuality }}
          </td>
          <td class="numeric">
            {{ simulationStore.meanPullQuality }}
          </td>
          <td class="numeric">
            {{ simulationStore.meanPullDPSQuality }}
          </td>
          <td class="numeric">
            {{ simulationStore.meanPushDPSQuality }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.simulation-dashboard {
  color: var(--primary-color);
}

td.numeric {
  text-align: right;
}
</style>
