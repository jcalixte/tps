<script setup lang="ts">
import ProblemSolvingIcon from '@/icons/ProblemSolvingIcon.vue'
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
import SeparatorIcon from '@/icons/SeparatorIcon.vue'
import { useFeatureStore } from '@/modules/feature/feature-store'

const featureStore = useFeatureStore()
</script>

<template>
  <div class="flow-dashboard">
    <div class="row cards">
      <div class="card">
        Features
        <span class="numeric">
          {{ featureStore.totalFeaturesDone
          }}<span class="sub">/{{ featureStore.totalFeaturesCount }} </span>
        </span>
      </div>
      <div class="card">
        Team work exp.
        <span class="numeric">
          {{ featureStore.meta.teamWorkExperience.toFixed(2) }}
        </span>
      </div>
      <div class="card">
        Mean complexity
        <div class="numeric">{{ featureStore.meanComplexity }}</div>
      </div>
      <div class="card">
        Mean lead time
        <div class="data">
          <span class="numeric">{{ featureStore.meanLeadTime }}</span>
          days
        </div>
      </div>
      <div class="card">
        Days
        <div class="data">
          <span class="numeric">{{ featureStore.meta.totalDays }}</span
          >d
        </div>
      </div>
      <div class="card">
        Takt time
        <div class="data">
          <span class="numeric">{{ featureStore.taktTime }}</span>
          days
        </div>
      </div>
      <div class="card">
        ETA
        <div class="data">
          <span class="numeric">{{ featureStore.eat }}</span>
          days
        </div>
      </div>
    </div>
    <SeparatorIcon />
    <div class="row">
      <button
        @click="featureStore.nextDay('push')"
        :disabled="featureStore.isProjectFinished"
      >
        <PushSystemIcon color="white" />
      </button>
      <button
        @click="featureStore.nextDay('pull')"
        :disabled="featureStore.isProjectFinished"
      >
        <PullSystemIcon color="white" />
      </button>
      <button
        @click="featureStore.nextDay('problem-solving')"
        :disabled="featureStore.isProjectFinished"
      >
        <ProblemSolvingIcon color="white" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flow-dashboard {
  font-size: 16pt;
  display: flex;
  flex-direction: column;
  align-items: center;

  .row {
    display: flex;
    justify-content: center;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .card {
    background-color: #f7d794;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .numeric {
      flex: 1;
    }
  }
}
</style>
