export type FeatureStep = {
  title: string
  blueBuckets: number
  stepIndex: number
}

export const featureSteps: FeatureStep[] = [
  {
    title: 'Product',
    stepIndex: 4,
    blueBuckets: 2
  },
  {
    title: 'Design',
    stepIndex: 3,
    blueBuckets: 1
  },
  {
    title: 'Development',
    stepIndex: 2,
    blueBuckets: 2
  },
  {
    title: 'UAT',
    stepIndex: 1,
    blueBuckets: 3
  },
  {
    title: 'Release',
    stepIndex: 0,
    blueBuckets: 0
  }
]
