import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { features } from '@/modules/feature/feature.fixture'
import { Strategy } from '@/modules/lean/strategy'
import { pickRandomElement, popNElement, shuffleArray } from '@/utils'

const MAX_FEATURES = 30

const hasQualityIssue = (
  complexity: number,
  tasksInParallel: number
): boolean => {
  let probabilityOfQualityIssue = 0

  switch (complexity) {
    case 1:
      probabilityOfQualityIssue = 0.97

    case 2:
      probabilityOfQualityIssue = 0.93
      break
    case 3:
      probabilityOfQualityIssue = 0.88
      break
    case 4:
      probabilityOfQualityIssue = 0.82
      break
    case 5:
      probabilityOfQualityIssue = 0.75
      break

    default:
      probabilityOfQualityIssue = 0.65
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
    default:
      multiplicator = 1.25
  }

  return Math.random() > probabilityOfQualityIssue / multiplicator
}

export const newBoard = () => shuffleArray(features)

export const initBoard = (
  steps: FeatureStep[],
  features: Feature[]
): Feature[] => {
  const initialFeatures = popNElement(features, 10)

  initialFeatures.forEach((feature) => {
    const step = pickRandomElement(steps)
    feature.status = pickRandomElement(['doing', 'done'])
    feature.step = step.stepIndex
  })

  return initialFeatures
}

export const nextDay = ({
  backlog,
  features,
  initialStep,
  strategy
}: {
  backlog: Feature[]
  features: Feature[]
  initialStep: number
  strategy: Strategy
}): Feature[] => {
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

  if (strategy === 'push' && features.length < MAX_FEATURES) {
    const [newFeature] = popNElement(backlog, 1)

    if (newFeature) {
      features.push({ ...newFeature, step: initialStep })
    }
  }

  return features
}
