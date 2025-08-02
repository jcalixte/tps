type NonEmptyArray<T> = [T, ...T[]]

export type Tool = {
  name: string
  alias: string
  cooldown: number
}

export type Task = {
  name: string
  tools: NonEmptyArray<Tool>
}

export type Activity = {
  name: string
  tasks: NonEmptyArray<Task>
}

export type Deliverable = {
  name: string
  activities: NonEmptyArray<Activity>
}

export type Domain = {
  name: string
  deliverables: NonEmptyArray<Deliverable>
}
