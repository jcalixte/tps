export type FeatureStep = {
  title: string
  blueBins: number
  stepIndex: number
}

export const featureSteps: FeatureStep[] = [
  {
    title: 'Product',
    stepIndex: 4,
    blueBins: 2
  },
  {
    title: 'Design',
    stepIndex: 3,
    blueBins: 2
  },
  {
    title: 'Development',
    stepIndex: 2,
    blueBins: 2
  },
  {
    title: 'Test',
    stepIndex: 1,
    blueBins: 2
  },
  {
    title: 'Release',
    stepIndex: 0,
    blueBins: Infinity
  }
]
