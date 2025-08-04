import { Tool } from '@/modules/5s/types/workshop'

export const tools: Tool[] = [
  { name: 'Card Printer', alias: 'card-printer', cooldown: 5 },
  { name: 'Miniature Mold', alias: 'mini-mold', cooldown: 15 },
  { name: 'Dice Engraver', alias: 'dice-engraver', cooldown: 10 },
  { name: 'Board Cutter', alias: 'board-cutter', cooldown: 8 },
  { name: 'Rulebook Designer', alias: 'rulebook-dzn', cooldown: 6 },
  { name: 'Box Assembler', alias: 'box-asm', cooldown: 4 },
  { name: 'Component Painter', alias: 'painter', cooldown: 12 },
  { name: 'Lamination Machine', alias: 'laminator', cooldown: 7 }
]
export type NonEmptyArray<T> = [T, ...T[]]

export const aliasToTool = (alias: string): Tool =>
  tools.find((t) => t.alias === alias)!

export const chooseTools = (...aliases: string[]): NonEmptyArray<Tool> =>
  aliases.map(aliasToTool) as NonEmptyArray<Tool>
