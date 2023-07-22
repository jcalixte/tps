<script setup lang="ts">
import FeatureStep from '@/modules/feature/FeatureStep.vue'
import { createFeatureBoard } from '@/modules/feature/feature-board'
import { featureSteps as initialFeatureSteps } from '@/modules/feature/feature-steps'
import { ref } from 'vue'

const featureBoard = createFeatureBoard()

const featureSteps = ref(featureBoard.initBoard(initialFeatureSteps))
</script>

<template>
  <ul class="features-steps">
    <FeatureStep v-for="step in featureSteps" :key="step.title" :step="step" />
  </ul>
</template>

<style scoped lang="scss">
.features-steps {
  display: flex;
  flex: 1;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: flex-start;
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
    border-right: 3px solid var(--background-color);
    border-radius: 0;
  }

  li {
    flex: 1;
    height: 100%;
    margin: 0;
    color: var(--background-color);
    display: flex;
    flex-direction: column;
  }
}
</style>
