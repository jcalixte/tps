import { Random } from 'random-js'

const random = new Random()

export const randomInteger = (min: number, max: number) => {
  return random.integer(min, max)
}

export const randomFloat = (min: number, max: number) => {
  return random.real(min, max)
}

export const randomAlias = () =>
  Array.from({ length: 5 }, () =>
    Math.random() < 0.9
      ? String.fromCharCode(97 + Math.floor(Math.random() * 26))
      : '-'
  ).join('')

export const getMean = (data: number[]) =>
  Math.round(100 * (sumElements(data) / data.length)) / 100

export const getRound = (data: number, total: number) =>
  (Math.round(100 * (data / total)) / 100 || 0).toFixed(2)

export const shuffleArray = <T>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = randomInteger(0, currentIndex - 1)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }

  return array
}

export const popNElement = <T>(array: T[], numberOfElements: number) => {
  const poppedElements: T[] = []

  for (let i = 0; i < numberOfElements; i++) {
    const element = array.pop()

    if (element) {
      poppedElements.push(element)
    }
  }

  return poppedElements
}

export const pickRandomIndex = <T>(array: T[]) =>
  randomInteger(0, array.length - 1)

export const pickRandomElement = <T>(array: T[]) =>
  array[pickRandomIndex(array)]

export const sumElements = (array: number[]) => array.reduce((a, b) => a + b, 0)
