import { _5S } from '@/modules/5s/types/5s'
import { boardGames } from '@/modules/5s/types/board-games'
import { tools } from '@/modules/5s/types/tools'
import { BoardGame, Part, Task, Tool } from '@/modules/5s/types/workshop'
import { toDuration } from '@/modules/5s/utils'
import { accumulate, randomAlias } from '@/utils'
import { defineStore } from 'pinia'

type State = {
  tools: Tool[]
  boardGames: BoardGame[]
  currentBoardGameIndex: number | null
  currentPartIndex: number | null
  currentTaskIndex: number | null
  usedTools: string[]
  sUsed: _5S[]
  meta: {
    start: string | null
    end: string | null
    perfs: Array<{
      start: string
      end: string
      boardGames: BoardGame[]
      countGames: Record<string, number>
      totalGames: number
    }>
  }
}

const firstDemands = [
  boardGames[0],
  boardGames[0]
  // boardGames[0],
  // boardGames[0]
]

export const useBoardGameStore = defineStore('board-game', {
  state: (): State => ({
    tools: [],
    boardGames: [],
    currentBoardGameIndex: null,
    currentPartIndex: null,
    currentTaskIndex: null,
    usedTools: [],
    sUsed: [],
    meta: {
      start: null,
      end: null,
      perfs: []
    }
  }),
  actions: {
    initGame() {
      this.tools = tools.map((t) => ({
        ...t,
        reference: randomAlias()
      }))
      this.boardGames = firstDemands
      this.currentBoardGameIndex = 0
      this.currentPartIndex = 0
      this.currentTaskIndex = 0
      this.meta.start = new Date().toISOString()
      this.meta.end = null
    },
    craftWithTool(alias: string) {
      if (!this.currentTask) {
        return
      }

      const tool = this.tools.find((t) => t.reference === alias)

      if (!tool) {
        return
      }

      if (!this.currentTask.tools.some((t) => t.id === tool.id)) {
        return
      }

      this.usedTools = [...this.usedTools, tool.id]

      if (this.usedTools.length === this.currentTask.tools.length) {
        this.usedTools = []
        this.increment()
      }
    },
    increment() {
      if (
        !this.meta.start ||
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
      this.meta.end = new Date().toISOString()
      const countGames = accumulate(this.boardGames.map((b) => b.name))
      this.meta.perfs = [
        ...this.meta.perfs,
        {
          start: this.meta.start,
          end: this.meta.end,
          boardGames: [...this.boardGames],
          countGames,
          totalGames: this.boardGames.length
        }
      ]
      this.currentBoardGameIndex = null
      this.currentPartIndex = null
      this.currentTaskIndex = null
    },
    activateS(s: _5S) {
      this.sUsed = [...this.sUsed, s]
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
      if (!this.meta.start || !this.meta.end) {
        return null
      }

      return toDuration(new Date(this.meta.start), new Date(this.meta.end))
    },
    countUsedTools(): Record<string, number> {
      const metaToolIds = this.meta.perfs
        .flatMap((p) => p.boardGames)
        .flatMap((b) => b.parts)
        .flatMap((p) => p.tasks)
        .flatMap((t) => t.tools)
        .map((t) => t.id)

      if (
        !this.meta.start ||
        !this.currentTask ||
        !this.currentPart ||
        !this.currentBoardGame ||
        this.currentTaskIndex === null ||
        this.currentPartIndex === null ||
        this.currentBoardGameIndex === null
      ) {
        return accumulate(metaToolIds)
      }

      const currentBoardGameIndex = this.currentBoardGameIndex
      const currentPartIndex = this.currentPartIndex
      const currentTaskIndex = this.currentTaskIndex

      const toolIds = this.boardGames
        .filter((_, i) => i <= currentBoardGameIndex)
        .flatMap((b, boardIndex) =>
          boardIndex === currentBoardGameIndex
            ? b.parts.filter((_, i) => i <= currentPartIndex)
            : b.parts
        )
        .flatMap((p, partIndex) =>
          partIndex === currentPartIndex
            ? p.tasks.filter((_, i) => i <= currentTaskIndex)
            : p.tasks
        )
        .flatMap((t, taskIndex) =>
          taskIndex === currentTaskIndex
            ? this.usedTools
            : t.tools.map((t) => t.id)
        )

      return accumulate([...metaToolIds, ...toolIds])
    }
  }
})
