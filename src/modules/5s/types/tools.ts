import { Tool } from '@/modules/5s/types/workshop'

export const tools: Tool[] = [
  { name: 'Card Printer', id: 'card-printer', reference: '', cooldown: 5 },
  { name: 'Miniature Mold', id: 'mini-mold', reference: '', cooldown: 15 },
  { name: 'Dice Engraver', id: 'dice-engraver', reference: '', cooldown: 10 },
  { name: 'Board Cutter', id: 'board-cutter', reference: '', cooldown: 8 },
  { name: 'Rulebook Designer', id: 'rulebook-dzn', reference: '', cooldown: 6 },
  { name: 'Box Assembler', id: 'box-asm', reference: '', cooldown: 4 },
  { name: 'Component Painter', id: 'painter', reference: '', cooldown: 12 },
  { name: 'Lamination Machine', id: 'laminator', reference: '', cooldown: 7 }
]
export type NonEmptyArray<T> = [T, ...T[]]

export const idToTools = (id: string): Tool => tools.find((t) => t.id === id)!

export const chooseTools = (...ides: string[]): NonEmptyArray<Tool> =>
  ides.map(idToTools) as NonEmptyArray<Tool>
