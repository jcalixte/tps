export const shuffleArray = <T>(array: T[]) => {
  const arrayCopy = [...array]

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return arrayCopy
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
  Math.floor(Math.random() * array.length)

export const pickRandomElement = <T>(array: T[]) =>
  array[pickRandomIndex(array)]

export const sumElements = (array: number[]) => array.reduce((a, b) => a + b, 0)
