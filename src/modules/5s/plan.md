# Plan

## Context

Using these types, tools and utils:

```ts
import { NonEmptyArray } from '@/modules/5s/types/tools'

export type Tool = {
  name: string
  alias: string
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

export const tools: Tool[] = [
  { name: 'Card Printer', alias: 'card-printer' },
  { name: 'Miniature Mold', alias: 'mini-mold' },
  { name: 'Dice Engraver', alias: 'dice-engraver' },
  { name: 'Board Cutter', alias: 'board-cutter' },
  { name: 'Rulebook Designer', alias: 'rulebook-dzn' },
  { name: 'Box Assembler', alias: 'box-asm' },
  { name: 'Component Painter', alias: 'painter' },
  { name: 'Lamination Machine', alias: 'laminator' }
]
export type NonEmptyArray<T> = [T, ...T[]]

export const aliasToTool = (alias: string): Tool =>
  tools.find((t) => t.alias === alias)!

export const chooseTools = (...aliases: string[]): NonEmptyArray<Tool> =>
  aliases.map(aliasToTool) as NonEmptyArray<Tool>
```

## Demand

In TypeScript:

- create 9 board games with their parts and tasks. Each board games use at least 3 differents tools and have their specific parts but 20% of parts can be reused between board games and tasks may be the same, it must be relevant,
- each game, part and task have a original name,
- one of those board games must be chess

## Distribution

- 70% of tasks need 2 tools, 20% just 1, and 10% need 3.
- 50% of parts have 2 taks, 30% just 1, and 20% need 3,
- 4 games have 3 parts, 2 games have 1, 2 games have 2, 1 game have 1 part.
