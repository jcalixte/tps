import { Tool } from '@/modules/5s/types/workshop'

export const tools: Tool[] = [
  { name: 'Card Printer', id: 'card-printer', reference: '' },
  { name: 'Miniature Mold', id: 'mini-mold', reference: '' },
  { name: 'Dice Engraver', id: 'dice-engraver', reference: '' },
  { name: 'Cutter', id: 'cutter', reference: '' },
  { name: 'Rulebook Designer', id: 'rulebook-dzn', reference: '' },
  { name: 'Box Assembler', id: 'box-asm', reference: '' },
  { name: 'Component Painter', id: 'painter', reference: '' },
  { name: 'Lamination Machine', id: 'laminator', reference: '' },
  // Additional realistic tools
  {
    name: 'Shrink Wrap Machine',
    id: 'shrink-wrap',
    reference: ''
  },
  {
    name: 'Punch Board Cutter',
    id: 'punch-cutter',
    reference: ''
  },
  {
    name: 'Sticker Applicator',
    id: 'sticker-applicator',
    reference: ''
  },
  {
    name: 'Foil Stamping Press',
    id: 'foil-stamp',
    reference: ''
  },
  {
    name: 'Scanner',
    id: 'scanner',
    reference: ''
  },
  {
    name: 'Instruction Sheet Folder',
    id: 'sheet-folder',
    reference: ''
  },
  { name: 'Plastic Bag Sealer', id: 'bag-sealer', reference: '' },
  { name: 'Barcode Printer', id: 'barcode-printer', reference: '' }
]
export type NonEmptyArray<T> = [T, ...T[]]

export const idToTools = (id: string): Tool => tools.find((t) => t.id === id)!

export const chooseTools = (...ids: string[]): NonEmptyArray<Tool> =>
  ids.map(idToTools) as NonEmptyArray<Tool>
