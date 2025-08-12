import { NonEmptyArray } from '@/modules/5s/types/tools'

export type Tool = {
  name: string
  id: string
  reference: string
}

export type Task = {
  name: string
  tools: NonEmptyArray<Tool>
}

export type Part = {
  name: string
  tasks: NonEmptyArray<Task>
}

export type BoardGame = {
  name: string
  parts: NonEmptyArray<Part>
}
