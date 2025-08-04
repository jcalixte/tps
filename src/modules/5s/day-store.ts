import { Work } from '@/modules/5s/types/workshop'
import { defineStore } from 'pinia'

type State = {
  works: Work[]
}

export const useDayStore = defineStore('day', {
  state: (): State => ({
    works: []
  })
})
