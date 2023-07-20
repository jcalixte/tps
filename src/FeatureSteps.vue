<script setup lang="ts">
import FeatureStep from '@/FeatureStep.vue'
import { featureSteps } from '@/feature-steps'
</script>

<template>
  <ul class="features-steps">
    <FeatureStep v-for="step in featureSteps" :key="step.title" :step="step" />
  </ul>
</template>

<style scoped lang="scss">
.features-steps {
}
</style>
