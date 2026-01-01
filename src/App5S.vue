<script setup lang="ts">
import BoardGameWorkshop from '@/modules/5s/BoardGameWorkshop.vue'
import { ref } from 'vue'

const createdAt = new Date('2025-01-08').toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const storyParts = [
  'introduction',
  'first-play',
  'conclusion-first-play',
  'seiri',
  'second-play',
  'conclusion-second-play',
  'seiton',
  // until this point, every improvement is only on chess boards
  'seiso',
  'seiketsu', // now we improve everywhere!
  'shitsuke' // aaaand conclusion
]

const storyIndex = ref(0)
</script>

<template>
  <article>
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
