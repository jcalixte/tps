<script setup lang="ts">
import { useBoardGameStore } from '@/modules/5s/board-game-store'
import BoardGamePerformance from '@/modules/5s/BoardGamePerformance.vue'
import BoardGameToolbox from '@/modules/5s/Toolbox.vue'
import { _5S, is5S } from '@/modules/5s/types/5s'
import { onMounted, ref, toValue } from 'vue'

const userInput = ref('')
const mode = ref<_5S | null>(null)
const boardGameStore = useBoardGameStore()

if (import.meta.env.DEV) {
  onMounted(() => {
    boardGameStore.initGame()
  })
}

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

  // d for debug
  if (command === 'd') {
    boardGameStore.increment()
  }
}
</script>

<template>
  <header v-if="!boardGameStore.currentBoardGame">
    <button
      class="btn btn-primary"
      v-if="!boardGameStore.currentBoardGame"
      @click="boardGameStore.initGame"
    >
      start
    </button>
  </header>
  <div v-else class="board-game-workshop">
    <aside class="prose">
      <h2>Toolbox</h2>

      <BoardGameToolbox />
    </aside>
    <div class="main prose">
      <h2 class="title">Workshop</h2>

      <div>
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
                        <div class="inline-grid *:[grid-area:1/1] ml-2">
                          <div class="status status-info animate-ping"></div>
                          <div class="status status-info"></div>
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
    <aside class="performance prose">
      <h2>Performance</h2>
      <BoardGamePerformance />
    </aside>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code&display=swap');

.board-game-workshop {
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

.card-title {
  justify-content: center;
}
</style>
