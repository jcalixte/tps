export type FeatureStep = {
  title: string
  blueBins: number
  stepIndex: number
}

const BLUE_BIN_MAX = 2

export const featureSteps: FeatureStep[] = [
  {
    title: 'Product',
    stepIndex: 4,
    blueBins: BLUE_BIN_MAX
  },
  {
    title: 'Design',
    stepIndex: 3,
    blueBins: BLUE_BIN_MAX
  },
  {
    title: 'Development',
    stepIndex: 2,
    blueBins: BLUE_BIN_MAX
  },
  {
    title: 'Test',
    stepIndex: 1,
    blueBins: BLUE_BIN_MAX
  },
  {
    title: 'Release',
    stepIndex: 0,
    blueBins: 99999
  }
]
