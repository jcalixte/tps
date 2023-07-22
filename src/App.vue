<script setup lang="ts">
import FeatureSteps from '@/modules/feature/FeatureSteps.vue'
import { StarportCarrier } from 'vue-starport'
</script>

<template>
  <main id="main-app">
    <StarportCarrier>
      <FeatureSteps />
    </StarportCarrier>
  </main>
</template>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 2 * 1rem);
}
</style>
