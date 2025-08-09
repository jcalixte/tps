import { Tool } from '@/modules/5s/types/workshop'

export const tools: Tool[] = [
  { name: 'Card Printer', id: 'card-printer', reference: '', cooldown: 5 },
  { name: 'Miniature Mold', id: 'mini-mold', reference: '', cooldown: 15 },
  { name: 'Dice Engraver', id: 'dice-engraver', reference: '', cooldown: 10 },
  { name: 'Cutter', id: 'cutter', reference: '', cooldown: 8 },
  { name: 'Rulebook Designer', id: 'rulebook-dzn', reference: '', cooldown: 6 },
  { name: 'Box Assembler', id: 'box-asm', reference: '', cooldown: 4 },
  { name: 'Component Painter', id: 'painter', reference: '', cooldown: 12 },
  { name: 'Lamination Machine', id: 'laminator', reference: '', cooldown: 7 },
  // Additional realistic tools
  {
    name: 'Shrink Wrap Machine',
    id: 'shrink-wrap',
    reference: '',
    cooldown: 9
  },
  {
    name: 'Punch Board Cutter',
    id: 'punch-cutter',
    reference: '',
    cooldown: 11
  },
  {
    name: 'Sticker Applicator',
    id: 'sticker-applicator',
    reference: '',
    cooldown: 6
  },
  {
    name: 'Foil Stamping Press',
    id: 'foil-stamp',
    reference: '',
    cooldown: 13
  },
  {
    name: 'Scanner',
    id: 'scanner',
    reference: '',
    cooldown: 5
  },
  {
    name: 'Instruction Sheet Folder',
    id: 'sheet-folder',
    reference: '',
    cooldown: 7
  },
  { name: 'Plastic Bag Sealer', id: 'bag-sealer', reference: '', cooldown: 4 },
  { name: 'Barcode Printer', id: 'barcode-printer', reference: '', cooldown: 8 }
]
export type NonEmptyArray<T> = [T, ...T[]]

export const idToTools = (id: string): Tool => tools.find((t) => t.id === id)!

export const chooseTools = (...ids: string[]): NonEmptyArray<Tool> =>
  ids.map(idToTools) as NonEmptyArray<Tool>
