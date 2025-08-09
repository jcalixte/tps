export type _5S = 'seiri' | 'seiton' | 'seiso' | 'seiketsu' | 'shitsuke'
const all5S: _5S[] = ['seiri', 'seiton', 'seiso', 'seiketsu', 'shitsuke']

export const is5S = (s: string): s is _5S => {
  return all5S.includes(s as _5S)
}
