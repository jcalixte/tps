import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { features } from '@/modules/feature/feature.fixture'
import { pickRandomElement, popNElement, shuffleArray } from '@/utils'

const hasQualityIssue = (
  complexity: number,
  tasksInParallel: number
): boolean => {
  let probabilityOfQualityIssue = 0

  switch (complexity) {
    case 1:
      probabilityOfQualityIssue = 0.8
      break
    case 2:
      probabilityOfQualityIssue = 0.7
      break
    case 3:
      probabilityOfQualityIssue = 0.6
      break

    default:
      probabilityOfQualityIssue = 0.5
      break
  }

  let multiplicator = 1

  switch (tasksInParallel) {
    case 1:
      multiplicator = 1
    case 2:
      multiplicator = 1.05
    case 3:
      multiplicator = 1.08
    case 4:
      multiplicator = 1.1
    case 5:
      multiplicator = 1.15
  }

  return Math.random() > probabilityOfQualityIssue / multiplicator
}

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

      switch (feature.status) {
        case 'doing':
          feature.status = 'done'
          break
        case 'done':
          feature.status = 'doing'

          if (
            hasQualityIssue(
              feature.complexity,
              features.filter(
                (f) => f.status === 'doing' && f.step === feature.step
              ).length
            )
          ) {
            feature.step = Math.min(4, feature.step + 1)
            feature.qualityIssue++
          } else {
            feature.step--
          }
          break
      }
    })

    return features
  }

  return { initBoard, nextDay }
}
