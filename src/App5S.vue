<script setup lang="ts">
import BoardGameWorkshop from '@/modules/5s/BoardGameWorkshop.vue'

const createdAt = new Date('2025-01-08').toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <article id="main-app">
    <h1>5S</h1>
    <h2 class="created-at numeric">
      {{ createdAt }}
    </h2>
    <div class="text">
      <p>You're a board game craftperson.</p>
    </div>
    <BoardGameWorkshop />
  </article>
</template>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 2 * 1rem);
}
</style>
