export const getMean = (data: number[]) =>
  Math.round(100 * (sumElements(data) / data.length)) / 100

export const clone = (data: any) => JSON.parse(JSON.stringify(data))

export const shuffleArray = <T>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
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
  Math.floor(Math.random() * array.length)

export const pickRandomElement = <T>(array: T[]) =>
  array[pickRandomIndex(array)]

export const sumElements = (array: number[]) => array.reduce((a, b) => a + b, 0)
