<script setup lang="ts">
import { useBoardGameStore } from '@/modules/5s/board-game-store'
import { toDuration, toSeconds } from '@/modules/5s/utils'
import { getNatural } from '@/utils'
import { ref } from 'vue'

const boardGameStore = useBoardGameStore()

const duration = ref<string | null>(null)

setInterval(() => {
  duration.value = boardGameStore.meta.start
    ? toDuration(
        new Date(boardGameStore.meta.start),
        boardGameStore.meta.end ? new Date(boardGameStore.meta.end) : new Date()
      )
    : null
}, 1000)
</script>

<template>
  <div class="board-game-performance">
    <p class="numeric">{{ duration }}</p>

    <template v-if="boardGameStore.meta.perfs.length > 0">
      <h3>Last performances</h3>

      <table class="table">
        <thead>
          <tr>
            <th>Round</th>
            <th>Duration</th>
            <th>Board Games</th>
            <th>Time / board game</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(perf, index) in boardGameStore.meta.perfs">
            <td>{{ index + 1 }}</td>
            <td class="numeric">
              {{ toDuration(new Date(perf.start), new Date(perf.end)) }}
            </td>
            <td class="numeric">
              {{ perf.totalGames }}
            </td>
            <td class="numeric">
              {{
                getNatural(
                  toSeconds(new Date(perf.start), new Date(perf.end)),
                  perf.totalGames
                )
              }}s
            </td>
          </tr>
        </tbody>
      </table>
      {{ boardGameStore.countUsedTools }}
    </template>
  </div>
</template>

<style scoped lang="scss">
.board-game-performance {
  .numeric {
    text-align: right;
  }
}
</style>
