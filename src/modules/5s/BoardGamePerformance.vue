<script setup lang="ts">
import { Chart as ChartJS, registerables } from 'chart.js'
import { useBoardGameStore } from '@/modules/5s/board-game-store'
import { toDuration, toSeconds } from '@/modules/5s/utils'
import { getNatural } from '@/utils'
import { _ } from '@faker-js/faker/dist/airline-D6ksJFwG'
import { computed, ref } from 'vue'
import { Bar } from 'vue-chartjs'

ChartJS.register(...registerables)

const boardGameStore = useBoardGameStore()

const duration = ref<string | null>(null)

const last10Perfs = computed(() =>
  [...boardGameStore.meta.perfs].slice(-10).reverse()
)

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

      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Duration</th>
              <th>Board Games</th>
              <th>Time / board game</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="perf in last10Perfs">
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
      </div>

      <h3>Progression</h3>

      <Bar
        id="my-chart-id"
        :data="{
          labels: boardGameStore.meta.perfs.map((_, i) => `Round #${i + 1}`),
          datasets: [
            {
              label: 'Time per board game (in s)',
              data: boardGameStore.meta.perfs.map((perf) =>
                toSeconds(new Date(perf.start), new Date(perf.end))
              )
            }
          ]
        }"
      />
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
