<script setup lang="ts">
import PullSystemArticle from '@/modules/pull-system/PullSystemArticle.vue'
import { StarportCarrier } from 'vue-starport'
</script>

<template>
  <main id="main-app">
    <StarportCarrier>
      <PullSystemArticle />
    </StarportCarrier>
  </main>
</template>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 2 * 1rem);
}
</style>
