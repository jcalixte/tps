export type FeatureStep = {
  title: string
  featuresInProgress: string[]
  featuresDone: string[]
  blueBuckets: number
}

export const featureSteps: FeatureStep[] = [
  {
    title: 'Pitch',
    featuresInProgress: ['Feature 3', 'Feature 4'],
    featuresDone: ['Feature 1', 'Feature 2'],
    blueBuckets: 2
  },
  {
    title: 'Design',
    featuresInProgress: [],
    featuresDone: [],
    blueBuckets: 1
  },
  {
    title: 'Investigation',
    featuresInProgress: [],
    featuresDone: [],
    blueBuckets: 1
  },
  {
    title: 'Product design',
    featuresInProgress: [],
    featuresDone: [],
    blueBuckets: 2
  },
  {
    title: 'Development',
    featuresInProgress: [],
    featuresDone: [],
    blueBuckets: 2
  },
  {
    title: 'UAT',
    featuresInProgress: [],
    featuresDone: [],
    blueBuckets: 3
  },
  {
    title: 'Release',
    featuresInProgress: [],
    featuresDone: [],
    blueBuckets: 0
  }
]
