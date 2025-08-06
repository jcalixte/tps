import { Tool } from '@/modules/5s/types/workshop'

export const tools: Tool[] = [
  { name: 'Card Printer', id: 'card-printer', alias: '', cooldown: 5 },
  { name: 'Miniature Mold', id: 'mini-mold', alias: '', cooldown: 15 },
  { name: 'Dice Engraver', id: 'dice-engraver', alias: '', cooldown: 10 },
  { name: 'Board Cutter', id: 'board-cutter', alias: '', cooldown: 8 },
  { name: 'Rulebook Designer', id: 'rulebook-dzn', alias: '', cooldown: 6 },
  { name: 'Box Assembler', id: 'box-asm', alias: '', cooldown: 4 },
  { name: 'Component Painter', id: 'painter', alias: '', cooldown: 12 },
  { name: 'Lamination Machine', id: 'laminator', alias: '', cooldown: 7 }
]
export type NonEmptyArray<T> = [T, ...T[]]

export const idToTools = (id: string): Tool => tools.find((t) => t.id === id)!

export const chooseTools = (...ides: string[]): NonEmptyArray<Tool> =>
  ides.map(idToTools) as NonEmptyArray<Tool>
