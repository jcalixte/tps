<script setup lang="ts">
import { ref } from 'vue'

const createdAt = new Date('2026-01-01').toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <article id="main-app">
    <h1>Heijunka</h1>
    <h2 class="created-at numeric">
      {{ createdAt }}
    </h2>
    <div class="text">
      <p>You're selling shirts, jeans and shoes.</p>
    </div>
    <BoardGameWorkshop />
  </article>
</template>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 2 * 1rem);
}
</style>
