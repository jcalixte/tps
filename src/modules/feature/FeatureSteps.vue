<script setup lang="ts">
import FeatureStep from '@/modules/feature/FeatureStep.vue'
import { featureSteps } from '@/modules/feature/feature-steps'
import { useFeatureStore } from '@/modules/feature/feature-store'
import { onMounted } from 'vue'

const NUMBER_OF_FEATURES = 20

const featureStore = useFeatureStore()

onMounted(() => featureStore.initBoard(NUMBER_OF_FEATURES))
</script>

<template>
  <div class="dashboard">
    <div>
      {{ featureStore.features.length }} / {{ NUMBER_OF_FEATURES }} features in
      the board | mean complexity : {{ featureStore.meanComplexity }} | mean
      lead time : {{ featureStore.meanLeadTime }} days | Total days:
      {{ featureStore.meta.totalDays }} | Team work experience:
      {{ featureStore.meta.teamWorkExperience }}
    </div>
    <div class="row">
      New feature live every {{ featureStore.taktTime }} days. Finishing in
      {{ featureStore.eat }} days.
    </div>
    <div class="row">Strategy of the day:</div>
    <div class="row">
      <button @click="featureStore.nextDay('push')">push system</button>
      <button @click="featureStore.nextDay('pull')">pull system</button>
      <button @click="featureStore.nextDay('problem-solving')">
        problem solving
      </button>
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
  border: 3px solid var(--primary-color);

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
    color: var(--primary-color);
    display: flex;
    flex-direction: column;
  }
}
</style>
