<script setup lang="ts">
import FeatureStep from '@/modules/pull-system/feature/FeatureStep.vue'
import { featureSteps } from '@/modules/pull-system/feature/feature-steps'
import { useFeatureStore } from '@/modules/pull-system/feature/feature-store'
import { onMounted } from 'vue'

const NUMBER_OF_FEATURES = 20

defineProps<{ alias: string }>()

const featureStore = useFeatureStore()

onMounted(() => featureStore.initBoard('mobile-app', NUMBER_OF_FEATURES))
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
  align-items: stretch;
  margin: 0 1rem;
  border: 3px solid var(--primary-color);
  height: 84vh;
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
    margin: 0;
    color: var(--primary-color);
    display: flex;
    flex-direction: column;
  }
}
</style>
