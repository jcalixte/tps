import { FeatureStatus, FeatureStep } from '@/modules/feature/feature-steps'
import { features } from '@/modules/feature/feature.fixture'
import { pickRandomElement, popNElement, shuffleArray } from '@/utils'

export const createFeatureBoard = () => {
  const boardFeatures = shuffleArray(features)

  const initBoard = (featureSteps: FeatureStep[]): FeatureStep[] => {
    const initialFeatures = popNElement(boardFeatures, 10)

    initialFeatures.forEach((feature) => {
      const step = pickRandomElement(featureSteps)
      const doingOrDone: FeatureStatus = pickRandomElement(['doing', 'done'])

      switch (doingOrDone) {
        case 'doing':
          step.featuresInProgress.push(feature)
          break
        case 'done':
          step.featuresDone.push(feature)
          break
      }
    })

    return featureSteps
  }

  return { initBoard }
}
