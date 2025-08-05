import { boardGames } from '@/modules/5s/types/board-games'
import { BoardGame } from '@/modules/5s/types/workshop'
import { defineStore } from 'pinia'

type State = {
  boardGames: BoardGame[]
  currentBoardGame: BoardGame | null
}

export const useBoardGameStore = defineStore('day', {
  state: (): State => ({
    boardGames: [],
    currentBoardGame: null
  }),
  actions: {
    initGame() {
      this.currentBoardGame = boardGames[0]
    }
  }
})
