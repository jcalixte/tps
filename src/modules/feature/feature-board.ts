import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { features } from '@/modules/feature/feature.fixture'
import { pickRandomElement, popNElement, shuffleArray } from '@/utils'

export const createFeatureBoard = () => {
  const boardFeatures = shuffleArray(features)

  const initBoard = (steps: FeatureStep[]): Feature[] => {
    const initialFeatures = popNElement(boardFeatures, 10)

    initialFeatures.forEach((feature) => {
      const step = pickRandomElement(steps)
      feature.status = pickRandomElement(['doing', 'done'])
      feature.step = step.stepIndex
    })

    return initialFeatures
  }

  const nextDay = (features: Feature[]): Feature[] => {
    features.forEach((feature) => {
      const isFeatureLive = feature.step === 0 && feature.status === 'done'
      if (isFeatureLive) {
        return
      }

      feature.leadTime++
    })

    return features
  }

  return { initBoard, nextDay }
}
