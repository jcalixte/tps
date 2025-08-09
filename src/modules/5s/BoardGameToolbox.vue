<script setup lang="ts">
import { useBoardGameStore } from '@/modules/5s/board-game-store'
import { computed } from 'vue'

const boardGameStore = useBoardGameStore()
const isSeitonActivated = computed(() =>
  boardGameStore.sUsed.includes('seiton')
)

const rawTools = boardGameStore.tools
  .map((t) => `${t.name} (${t.alias})`)
  .join(', ')
</script>

<template>
  <aside class="board-game-tools">
    <h2>Tools</h2>
    <div class="overflow-x-auto" v-if="isSeitonActivated">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Alias</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tool in boardGameStore.tools" :key="tool.alias">
            <td>{{ tool.name }}</td>
            <td>{{ tool.alias }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      {{ rawTools }}
    </div>
  </aside>
</template>

<style scoped lang="scss">
.board-game-tools {
  flex: 1;
}
</style>
