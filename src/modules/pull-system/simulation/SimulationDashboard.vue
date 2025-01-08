<script setup lang="ts">
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
import type { Strategy } from '@/modules/pull-system/lean/strategy'
import { useSimulationStore } from '@/modules/pull-system/simulation/simulation-store'

const simulationStore = useSimulationStore()

const strategies: Strategy[] = ['push', 'pull']
// [dps]
// const strategies: Strategy[] = ['push', 'pull', 'push-dps', 'pull-dps']
</script>

<template>
  <div class="simulation-dashboard">
    <h3>
      Dashboard
      <span class="simulation-count">
        {{ simulationStore.simulationsDone
        }}<span class="sub">/{{ simulationStore.requestedSimulation }}</span>
        simulations
      </span>
    </h3>
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="numeric">
            <PushSystemIcon />
            push system
          </th>
          <th class="numeric">
            <PullSystemIcon />
            pull system
          </th>
          <!-- [dps]
           <th class="numeric">push with problem solving</th>
          <th class="numeric">pull with problem solving</th> -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total days to finish</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanTotalDays(strategy) }}
          </td>
        </tr>
        <tr>
          <td>Mean lead time</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanLeadTime(strategy) }}
          </td>
        </tr>
        <!-- <tr>
          <td>Cycle time</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanCycleTime(strategy) }}
          </td>
        </tr> -->
        <tr>
          <td>Quality issues</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanQuality(strategy) }}
          </td>
        </tr>
        <!-- [complexity]
        <tr>
          <td>Complexity</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanComplexity(strategy) }}
          </td>
        </tr> -->
        <!-- [dps]
        <tr>
          <td>Team work exp.</td>
          <td class="numeric" v-for="strategy in strategies" :key="strategy">
            {{ simulationStore.meanTeamWorkExperience(strategy) }}
          </td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.simulation-dashboard {
  color: var(--primary-color);
  width: 100%;
}

.numeric {
  text-align: right;
}

.simulation-count {
  font-size: 14px;
}
</style>
