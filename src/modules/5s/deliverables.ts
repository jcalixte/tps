export type OpeningCoffeeShop = 'opening-coffee-shop'
export type ClosingCoffeeShop = 'closing-coffee-shop'

type Coffee =
  | 'latte'
  | 'flat white'
  | 'cold brew'
  | 'cappuccino'
  | 'espresso'
  | 'macchiato'
  | 'mocha'
  | 'americano'
  | 'iced latte'
  | 'chai latte'

type Brunch = 'eggs benedict' | 'avocado toast' | 'pancakes' | 'waffles'

type Deliverable = Coffee | OpeningCoffeeShop | ClosingCoffeeShop | Brunch
type Step =
  | 'steam milk'
  | 'extract espresso'
  | 'pour milk'
  | 'pour espresso'
  | 'add ice'
  | 'add water'
  | 'add chai'
  | 'add chocolate'
  | 'turn on lights'
  | 'turn on equipment'
  | 'prepare ingredients'
  | 'clean equipment'
  | 'store ingredients'
  | 'turn off equipment'
  | 'turn off lights'
  | 'poach eggs'
  | 'toast muffin'
  | 'cook bacon'
  | 'make hollandaise sauce'
  | 'toast bread'
  | 'slice avocado'
  | 'mix batter'
  | 'cook pancakes'
  | 'cook waffles'

export const aliases: Record<string, Step> = {
  sm: 'steam milk',
  ee: 'extract espresso',
  pm: 'pour milk',
  pe: 'pour espresso',
  ai: 'add ice',
  aw: 'add water',
  ac: 'add chai',
  ach: 'add chocolate',
  tol: 'turn on lights',
  toe: 'turn on equipment',
  pi: 'prepare ingredients',
  ce: 'clean equipment',
  si: 'store ingredients',
  tfe: 'turn off equipment',
  tfl: 'turn off lights',
  poe: 'poach eggs',
  tm: 'toast muffin',
  cb: 'cook bacon',
  mhs: 'make hollandaise sauce',
  tb: 'toast bread',
  sa: 'slice avocado',
  mb: 'mix batter',
  cp: 'cook pancakes',
  cw: 'cook waffles'
}

type Preparation = Record<Deliverable, Step[]>

export const deliverables: Preparation = {
  'opening-coffee-shop': [
    'turn on lights',
    'turn on equipment',
    'prepare ingredients'
  ],
  latte: ['steam milk', 'extract espresso', 'pour milk', 'pour espresso'],
  'iced latte': [
    'steam milk',
    'extract espresso',
    'pour milk',
    'pour espresso',
    'add ice'
  ],
  'cold brew': ['extract espresso', 'add water', 'add ice'],
  'chai latte': [
    'steam milk',
    'extract espresso',
    'pour milk',
    'pour espresso',
    'add chai'
  ],
  'flat white': [
    'steam milk',
    'extract espresso',
    'pour milk',
    'pour espresso'
  ],
  cappuccino: ['steam milk', 'extract espresso', 'pour milk', 'pour espresso'],
  espresso: ['extract espresso'],
  macchiato: ['extract espresso', 'pour milk'],
  mocha: [
    'steam milk',
    'extract espresso',
    'pour milk',
    'pour espresso',
    'add chocolate'
  ],
  americano: ['extract espresso', 'add water'],
  'eggs benedict': [
    'poach eggs',
    'toast muffin',
    'cook bacon',
    'make hollandaise sauce'
  ],
  'avocado toast': ['toast bread', 'slice avocado', 'poach eggs'],
  pancakes: ['mix batter', 'cook pancakes'],
  waffles: ['mix batter', 'cook waffles'],
  'closing-coffee-shop': [
    'clean equipment',
    'store ingredients',
    'turn off equipment',
    'turn off lights'
  ]
}

export const getDeliverable = (deliverable: Deliverable): Step[] => {
  switch (deliverable) {
    case 'opening-coffee-shop':
      return deliverables[deliverable]
    case 'latte':
      return deliverables[deliverable]
    case 'iced latte':
      return deliverables[deliverable]
    case 'cold brew':
      return deliverables[deliverable]
    case 'chai latte':
      return deliverables[deliverable]
    case 'flat white':
      return deliverables[deliverable]
    case 'cappuccino':
      return deliverables[deliverable]
    case 'espresso':
      return deliverables[deliverable]
    case 'macchiato':
      return deliverables[deliverable]
    case 'mocha':
      return deliverables[deliverable]
    case 'americano':
      return deliverables[deliverable]
    case 'eggs benedict':
      return deliverables[deliverable]
    case 'avocado toast':
      return deliverables[deliverable]
    case 'pancakes':
      return deliverables[deliverable]
    case 'waffles':
      return deliverables[deliverable]
    case 'closing-coffee-shop':
      return deliverables[deliverable]
  }
}

export const getAllSteps = (): Set<string> => {
  const allSteps = Object.values(deliverables).reduce(
    (acc, steps) => acc.concat(steps),
    []
  )

  return new Set(allSteps)
}
