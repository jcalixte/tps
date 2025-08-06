<script setup lang="ts">
import { useBoardGameStore } from '@/modules/5s/board-game-store'
import { tools } from '@/modules/5s/types/tools'
import { toDuration } from '@/modules/5s/utils'
import { ref, toValue } from 'vue'

const userInput = ref('')
const boardGameStore = useBoardGameStore()
const duration = ref<string | null>(null)

setInterval(() => {
  duration.value = boardGameStore.start
    ? toDuration(new Date(boardGameStore.start))
    : null
}, 1000)

const submit = () => {
  const tool = toValue(userInput)

  boardGameStore.craftWithTool(tool)

  userInput.value = ''
}
</script>

<template>
  <div class="board-game-workshop">
    <aside>
      <h2>Tools</h2>
      <table>
        <thead>
          <tr>
            <th>Tool</th>
            <th>Alias</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tool in tools" :key="tool.alias">
            <td>{{ tool.name }}</td>
            <td>{{ tool.alias }}</td>
          </tr>
        </tbody>
      </table>
    </aside>

    <div class="main">
      <h2>Workshop</h2>
      <button
        v-if="!boardGameStore.currentBoardGame"
        @click="boardGameStore.initGame"
      >
        start
      </button>

      <div v-if="boardGameStore.currentBoardGame">
        <form @submit.prevent="submit">
          <input type="text" v-model="userInput" autofocus />
        </form>

        <h3>
          {{ boardGameStore.currentBoardGame.name }}
        </h3>
        <div v-if="boardGameStore.currentTask">
          <h4>current task</h4>
          <p>{{ boardGameStore.currentTask.name }}</p>
          with tools:
          <ul>
            <li
              v-for="tool in boardGameStore.currentTask.tools"
              :key="tool.alias"
              :class="{
                'used-tool': boardGameStore.usedTools.some(
                  (t) => t === tool.alias
                )
              }"
            >
              {{ tool.name }}
            </li>
          </ul>
        </div>
        <hr />
        <ul>
          <li
            v-for="part in boardGameStore.currentBoardGame.parts"
            :key="part.name"
          >
            {{ part.name }}
            <ul>
              <li v-for="task in part.tasks" :key="task.name">
                {{ task.name }} ({{
                  task.tools.map((tool) => tool.name).join(', ')
                }})
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <aside v-if="duration">
      <h2>Performance</h2>

      <p>{{ duration }}</p>
    </aside>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code&display=swap');

.board-game-workshop {
  font-family: 'Google Sans Code', monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  min-width: 600px;
  display: flex;
  justify-content: space-between;
  gap: 4rem;

  input {
    font-family: 'Google Sans Code', monospace;
    padding: 0.5rem 1rem;
    border-radius: 0;
    border: 2px solid blanchedalmond;
  }
}

.used-tool {
  color: green;
}

button {
  color: white;
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
