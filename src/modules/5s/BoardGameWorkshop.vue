<script setup lang="ts">
import { useBoardGameStore } from '@/modules/5s/board-game-store'
import BoardGameToolbox from '@/modules/5s/BoardGameToolbox.vue'
import { _5S, is5S } from '@/modules/5s/types/5s'
import { toDuration } from '@/modules/5s/utils'
import { ref, toValue } from 'vue'

const userInput = ref('')
const mode = ref<_5S | null>(null)
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

const submit = () => {
  const lastInput = toValue(userInput)
  userInput.value = ''

  if (!lastInput.startsWith('/')) {
    boardGameStore.craftWithTool(lastInput)
    return
  }

  if (lastInput === '/') {
    mode.value = null
    return
  }

  const command = lastInput.split('/').pop()

  if (!command) {
    return
  }

  if (is5S(command)) {
    boardGameStore.activateS(command)
    return
  }
}
</script>

<template>
  <header>
    <button
      class="btn"
      v-if="!boardGameStore.currentBoardGame"
      @click="boardGameStore.initGame"
    >
      start
    </button>
  </header>
  <div class="board-game-workshop">
    <aside class="prose">
      <h2>Toolbox</h2>

      <BoardGameToolbox />
    </aside>
    <div class="main prose">
      <h2 class="title">Workshop</h2>

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
      class="performance prose"
      v-if="duration !== null || boardGameStore.meta.perfs.length > 0"
    >
      <h2>Performance</h2>

      <p class="duration numeric">{{ duration }}</p>

      <template v-if="boardGameStore.meta.perfs.length > 0">
        <h3>Last performances</h3>

        <ul>
          <li v-for="perf in boardGameStore.meta.perfs">
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
  gap: 1rem;
  padding: 1rem;

  input {
    font-family: 'Google Sans Code', monospace;
    padding: 0.5rem 1rem;
    border-radius: 0;
    border: 2px solid blanchedalmond;
  }
}

h2 {
  text-align: center;
}

form {
  text-align: center;
}

.crafted,
.used-tool {
  color: green;
}

aside,
.aside {
  flex: 1;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card {
  margin: 1rem;
}

.duration {
  text-align: right;
}
</style>
