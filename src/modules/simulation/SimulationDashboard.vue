<script setup lang="ts">
import { Strategy } from '@/modules/lean/strategy'
import { useSimulationStore } from '@/modules/simulation/simulation-store'

const simulationStore = useSimulationStore()

const strategies: Strategy[] = ['push', 'pull', 'push-dps', 'pull-dps']
</script>

<template>
  <div class="simulation-dashboard">
    <h3>Dashboard</h3>
    <h4>
      {{ simulationStore.simulationsDone
      }}<span class="sub">/{{ simulationStore.requestedSimulation }}</span>
      simulations
    </h4>
    <table>
      <thead>
        <tr>
          <th>mean values</th>
          <th class="numeric">push</th>
          <th class="numeric">pull</th>
          <th class="numeric">push and DPS</th>
          <th class="numeric">pull and DPS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total days</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanTotalDays(strategy) }}
          </td>
        </tr>
        <tr>
          <td>Lead time</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanLeadTime(strategy) }}
          </td>
        </tr>
        <tr>
          <td>Takt time</td>
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
        <tr>
          <td>Team work exp.</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanTeamWorkExperience(strategy) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.simulation-dashboard {
  color: var(--primary-color);
  width: 100%;

  table {
    padding: 1rem;
  }
}

.numeric {
  text-align: right;
}
</style>
