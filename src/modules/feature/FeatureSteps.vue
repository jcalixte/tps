<script setup lang="ts">
import FeatureStep from '@/modules/feature/FeatureStep.vue'
import { featureSteps } from '@/modules/feature/feature-steps'
import { useFeatureStore } from '@/modules/feature/store'
import { onMounted } from 'vue'

const featureStore = useFeatureStore()

onMounted(() => featureStore.initBoard())

const problemSolving20Percent = () => {
  if (featureStore.meta.totalDays % 5 === 0) {
    featureStore.nextDay('problem-solving')
  } else {
    featureStore.nextDay('pull')
  }
}
</script>

<template>
  <div class="dashboard">
    <div>
      {{ featureStore.features.length }} features | mean complexity :
      {{ featureStore.meanComplexity }} | mean lead time :
      {{ featureStore.meanLeadTime }} days
    </div>
    <div>
      <button @click="featureStore.nextDay('push')">push system</button>
      <button @click="featureStore.nextDay('pull')">pull system</button>
      <button @click="problemSolving20Percent">pull and problem solving</button>
      <button @click="featureStore.nextDay('problem-solving')">
        problem solving
      </button>
      Total days: {{ featureStore.meta.totalDays }}
    </div>
  </div>
  <ul class="features-steps">
    <FeatureStep
      v-for="step in featureSteps"
      :key="step.title"
      :step="step"
      :features="featureStore.featuresGroupedByStep[step.stepIndex] ?? []"
    />
  </ul>
</template>

<style scoped lang="scss">
.dashboard,
pre {
  color: black;
}

.features-steps {
  display: flex;
  flex: 1;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 0 1rem;
  border: 3px solid var(--background-color);

  li:first-child {
    margin-left: 1rem;
  }

  li:last-child {
    margin-right: 1rem;
  }

  li:not(:last-child) {
    padding-right: 1rem;
    border-radius: 0;
  }

  li {
    flex: 1;
    min-height: 100%;
    margin: 0;
    color: var(--background-color);
    display: flex;
    flex-direction: column;
  }
}
</style>
