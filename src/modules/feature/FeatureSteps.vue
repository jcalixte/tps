<script setup lang="ts">
import FeatureStep from '@/modules/feature/FeatureStep.vue'
import { featureSteps } from '@/modules/feature/feature-steps'
import { useFeatureStore } from '@/modules/feature/feature-store'
import { onMounted } from 'vue'

const NUMBER_OF_FEATURES = 20

defineProps<{ alias: string }>()

const featureStore = useFeatureStore()

onMounted(() => featureStore.initBoard(NUMBER_OF_FEATURES))
</script>

<template>
  <ul class="features-steps">
    <FeatureStep
      v-for="step in featureSteps"
      :prefix="alias"
      :key="step.title"
      :step="step"
      :features="featureStore.featuresGroupedByStep[step.stepIndex] ?? []"
    />
  </ul>
</template>

<style scoped lang="scss">
.features-steps {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 0 1rem;
  border: 3px solid var(--primary-color);
  height: 80vh;
  width: 100%;
  overflow-y: hidden;

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
    max-height: 100%;
  }
}
</style>
