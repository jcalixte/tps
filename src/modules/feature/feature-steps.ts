export type FeatureStatus = 'doing' | 'done'

export type FeatureStep = {
  title: string
  featuresInProgress: Feature[]
  featuresDone: Feature[]
  blueBuckets: number
}

export const featureSteps: FeatureStep[] = [
  {
    title: 'Pitch',
    featuresInProgress: [],
    featuresDone: [],
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
