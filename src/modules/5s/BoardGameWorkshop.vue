<script setup lang="ts">
import { useBoardGameStore } from '@/modules/5s/board-game-store'
import { toDuration } from '@/modules/5s/utils'
import { ref, toValue } from 'vue'

const userInput = ref('')
const boardGameStore = useBoardGameStore()
const duration = ref<string | null>(null)

setInterval(() => {
  duration.value = boardGameStore.start
    ? toDuration(
        new Date(boardGameStore.start),
        boardGameStore.end ? new Date(boardGameStore.end) : new Date()
      )
    : null
}, 1000)

const submit = () => {
  const lastInput = toValue(userInput)

  boardGameStore.craftWithTool(lastInput)

  userInput.value = ''
}
</script>

<template>
  <div class="board-game-workshop prose">
    <aside>
      <h2>Tools</h2>
      <div class="overflow-x-auto">
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
    </aside>

    <div class="main">
      <h2>Workshop</h2>
      <button
        class="btn"
        v-if="!boardGameStore.currentBoardGame"
        @click="boardGameStore.initGame"
      >
        start
      </button>

      <div v-if="boardGameStore.currentBoardGame">
        <form @submit.prevent="submit">
          <input type="text" v-model="userInput" autofocus />
        </form>

        <div class="card bg-base-100 w-96 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">
              {{ boardGameStore.currentBoardGame.name }}
            </h2>
            <ul>
              <li
                v-for="(part, partIndex) in boardGameStore.currentBoardGame
                  .parts"
                :key="part.name"
              >
                <span
                  :class="{
                    crafted: boardGameStore.currentPartIndex
                      ? partIndex <= boardGameStore.currentPartIndex
                      : false
                  }"
                >
                  {{ part.name }}
                </span>
                <template v-if="partIndex === boardGameStore.currentPartIndex">
                  <div class="inline-grid *:[grid-area:1/1]">
                    <div class="status status-primary animate-ping"></div>
                    <div class="status status-primary"></div>
                  </div>

                  <ol>
                    <li
                      v-for="(task, taskIndex) in boardGameStore.currentPart
                        ?.tasks"
                      :key="task.name"
                    >
                      <span
                        :class="{
                          crafted: boardGameStore.currentTaskIndex
                            ? taskIndex < boardGameStore.currentTaskIndex
                            : false
                        }"
                        >{{ task.name }}</span
                      >
                      <template
                        v-if="
                          taskIndex === boardGameStore.currentTaskIndex &&
                          boardGameStore.currentTask
                        "
                      >
                        <div class="inline-grid *:[grid-area:1/1]">
                          <div class="status status-primary animate-ping"></div>
                          <div class="status status-primary"></div>
                        </div>
                        <ul>
                          <li
                            v-for="tool in boardGameStore.currentTask.tools"
                            :key="tool.id"
                            :class="{
                              'used-tool': boardGameStore.usedTools.some(
                                (t) => t === tool.id
                              )
                            }"
                          >
                            {{ tool.name }}
                          </li>
                        </ul>
                      </template>
                    </li>
                  </ol>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <aside
      class="performance"
      v-if="duration !== null || boardGameStore.perfs.length > 0"
    >
      <h2>Performance</h2>

      <p>{{ duration }}</p>

      <template v-if="boardGameStore.perfs.length > 0">
        <h3>Last performances</h3>

        <ul>
          <li v-for="perf in boardGameStore.perfs">
            {{ toDuration(new Date(perf[0]), new Date(perf[1])) }}
          </li>
        </ul>
      </template>
    </aside>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code&display=swap');

.board-game-workshop {
  flex: 1;
  font-family: 'Google Sans Code', monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  display: flex;
  gap: 4rem;

  input {
    font-family: 'Google Sans Code', monospace;
    padding: 0.5rem 1rem;
    border-radius: 0;
    border: 2px solid blanchedalmond;
  }
}

form {
  text-align: center;
}

.crafted,
.used-tool {
  color: green;
}

aside {
  flex: 1;
}

.main {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
