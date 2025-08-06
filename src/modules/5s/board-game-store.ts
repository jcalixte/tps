import { boardGames } from '@/modules/5s/types/board-games'
import { BoardGame, Part, Task } from '@/modules/5s/types/workshop'
import { toDuration } from '@/modules/5s/utils'
import { defineStore } from 'pinia'

type State = {
  boardGames: BoardGame[]
  currentBoardGameIndex: number | null
  currentPartIndex: number | null
  currentTaskIndex: number | null
  usedTools: string[]
  start: string | null
  end: string | null
}

export const useBoardGameStore = defineStore('board-game', {
  state: (): State => ({
    boardGames: [],
    currentBoardGameIndex: null,
    currentPartIndex: null,
    currentTaskIndex: null,
    usedTools: [],
    start: null,
    end: null
  }),
  actions: {
    initGame() {
      this.boardGames = [boardGames[0], boardGames[1]]
      this.currentBoardGameIndex = 0
      this.currentPartIndex = 0
      this.currentTaskIndex = 0
      this.start = new Date().toISOString()
    },
    craftWithTool(tool: string) {
      if (!this.currentTask) {
        return
      }

      if (!this.currentTask.tools.some((t) => t.alias === tool)) {
        return
      }

      this.usedTools = [...this.usedTools, tool]

      if (this.usedTools.length === this.currentTask.tools.length) {
        this.usedTools = []
        this.increment()
      }
    },
    increment() {
      if (
        !this.currentTask ||
        !this.currentPart ||
        !this.currentBoardGame ||
        this.currentTaskIndex === null ||
        this.currentPartIndex === null ||
        this.currentBoardGameIndex === null
      ) {
        return
      }

      // Move to next task
      if (this.currentTaskIndex + 1 < this.currentPart.tasks.length) {
        this.currentTaskIndex += 1
        return
      }

      // All tasks in part complete, move to next part
      this.currentTaskIndex = 0
      if (this.currentPartIndex + 1 < this.currentBoardGame.parts.length) {
        this.currentPartIndex += 1
        return
      }

      // All parts in board game complete, move to next board game
      this.currentPartIndex = 0
      if (this.currentBoardGameIndex + 1 < this.boardGames.length) {
        this.currentBoardGameIndex += 1
        return
      }

      // All board games complete
      this.end = new Date().toISOString()
      this.currentBoardGameIndex = null
      this.currentPartIndex = null
      this.currentTaskIndex = null
    }
  },
  getters: {
    currentBoardGame(): BoardGame | null {
      if (this.currentBoardGameIndex === null) {
        return null
      }

      if (this.currentBoardGameIndex >= this.boardGames.length) {
        return null
      }

      return this.boardGames[this.currentBoardGameIndex]
    },
    currentPart(): Part | null {
      if (!this.currentBoardGame || this.currentPartIndex === null) {
        return null
      }

      if (this.currentPartIndex >= this.currentBoardGame.parts.length) {
        return null
      }

      return this.currentBoardGame.parts[this.currentPartIndex]
    },
    currentTask(): Task | null {
      if (!this.currentPart || this.currentTaskIndex === null) {
        return null
      }

      if (this.currentTaskIndex >= this.currentPart.tasks.length) {
        return null
      }

      return this.currentPart.tasks[this.currentTaskIndex]
    },
    durationToComplete(): string | null {
      if (!this.start || !this.end) {
        return null
      }

      return toDuration(new Date(this.start), new Date(this.end))
    }
  }
})
