<script setup lang="ts">
import { useBoardGameStore } from '@/modules/5s/board-game-store'
import { shuffleArray } from '@/utils'
import { computed } from 'vue'

const boardGameStore = useBoardGameStore()

const isSeiriActivated = computed(() => boardGameStore.sUsed.includes('seiri'))
const isSeitonActivated = computed(() =>
  boardGameStore.sUsed.includes('seiton')
)
// const isSeisoActivated = computed(() => boardGameStore.sUsed.includes('seiso'))

const neededTools = computed(
  () =>
    new Set(
      boardGameStore.boardGames
        .flatMap((g) => g.parts)
        .flatMap((p) => p.tasks)
        .flatMap((t) => t.tools)
        .map((t) => t.id)
    )
)

const tools = computed(() => {
  if (isSeiriActivated.value) {
    return boardGameStore.tools.filter((t) => neededTools.value.has(t.id))
  } else {
    return boardGameStore.tools
  }
})

const toolsToDisplay = computed(() =>
  shuffleArray(tools.value.map((t) => `${t.name} (ref: ${t.reference})`)).join(
    ', '
  )
)
</script>

<template>
  <div class="board-game-tools prose">
    <div class="overflow-x-auto" v-if="isSeitonActivated">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Reference</th>
            <th>Used</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tool in tools" :key="tool.reference">
            <td>{{ tool.name }}</td>
            <td class="numeric">{{ tool.reference }}</td>
            <td>{{ boardGameStore.countUsedTools[tool.id] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      {{ toolsToDisplay }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.board-game-tools {
  flex: 1;
}
</style>
