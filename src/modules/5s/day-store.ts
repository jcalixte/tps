import { BoardGame } from '@/modules/5s/types/workshop'
import { defineStore } from 'pinia'

type State = {
  works: BoardGame[]
}

export const useDayStore = defineStore('day', {
  state: (): State => ({
    works: []
  })
})
