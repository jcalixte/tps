<script setup lang="ts">
import FlowArticle from '@/modules/FlowArticle.vue'
import { StarportCarrier } from 'vue-starport'
</script>

<template>
  <main id="main-app">
    <StarportCarrier>
      <FlowArticle />
    </StarportCarrier>
  </main>
</template>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 2 * 1rem);
}
</style>
