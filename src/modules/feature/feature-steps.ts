export type FeatureStep = {
  title: string
  blueBins: number
  stepIndex: number
}

const BLUE_BIN_MAX = 2

const featureSteps: FeatureStep[] = [
  {
    title: 'Product',
    stepIndex: 0,
    blueBins: BLUE_BIN_MAX
  },
  {
    title: 'Design',
    stepIndex: 0,
    blueBins: BLUE_BIN_MAX
  },
  {
    title: 'Development',
    stepIndex: 0,
    blueBins: BLUE_BIN_MAX
  },
  {
    title: 'Release',
    stepIndex: 0,
    blueBins: 99999
  }
]

featureSteps.forEach(
  (feature, index) => (feature.stepIndex = featureSteps.length - index - 1)
)

export { featureSteps }
