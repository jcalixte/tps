import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { features } from '@/modules/feature/feature.fixture'
import { Strategy } from '@/modules/lean/strategy'
import { pickRandomElement, popNElement, shuffleArray } from '@/utils'

const MAX_FEATURES = 30

const hasQualityIssue = ({
  complexity,
  tasksInParallel,
  daysWithProblemSolving
}: {
  complexity: number
  tasksInParallel: number
  daysWithProblemSolving: number
}): boolean => {
  let probabilityOfGoodQuality = 1

  switch (complexity) {
    case 1:
      probabilityOfGoodQuality = 0.97

    case 2:
      probabilityOfGoodQuality = 0.93
      break
    case 3:
      probabilityOfGoodQuality = 0.88
      break
    case 4:
      probabilityOfGoodQuality = 0.82
      break
    case 5:
      probabilityOfGoodQuality = 0.75
      break
  }

  // learnings
  probabilityOfGoodQuality =
    probabilityOfGoodQuality + (1.2 * daysWithProblemSolving) / 100

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
    case 6:
      multiplicator = 1.25
    default:
      multiplicator = 1.4
  }

  return Math.random() > probabilityOfGoodQuality / multiplicator
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
  steps,
  strategy,
  daysWithProblemSolving
}: {
  backlog: Feature[]
  features: Feature[]
  steps: FeatureStep[]
  initialStep: number
  strategy: Strategy
  daysWithProblemSolving: number
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
        if (strategy === 'pull') {
          const nextStep = steps.find(
            (step) => step.stepIndex === feature.step - 1
          )
          if (!nextStep) {
            break
          }

          const hasBlueBinAvailableNextStep =
            nextStep.blueBins -
              features.filter(
                (f) => f.step === feature.step - 1 && f.status === 'done'
              ).length >
            0

          if (hasBlueBinAvailableNextStep) {
            feature.status = 'doing'
          }
        } else {
          feature.status = 'doing'
        }

        if (
          hasQualityIssue({
            complexity: feature.complexity,
            tasksInParallel: features.filter(
              (f) => f.status === 'doing' && f.step === feature.step
            ).length,
            daysWithProblemSolving
          })
        ) {
          feature.step = Math.min(4, feature.step + 1)
          feature.qualityIssue++
        } else {
          feature.step--
        }
        break
    }
  })

  if (features.length < MAX_FEATURES) {
    switch (strategy) {
      case 'push': {
        const [newFeature] = popNElement(backlog, 1)

        if (newFeature) {
          features.push({ ...newFeature, step: initialStep })
        }
        break
      }
      case 'pull': {
        const firstStep = steps.find((step) => step.stepIndex === initialStep)
        if (!firstStep) {
          break
        }

        const hasBlueBinAvailableOnFirstStep =
          firstStep.blueBins -
            features.filter(
              (f) => f.step === initialStep && f.status === 'done'
            ).length >
          0

        if (hasBlueBinAvailableOnFirstStep) {
          const [newFeature] = popNElement(backlog, 1)

          if (newFeature) {
            features.push({ ...newFeature, step: initialStep })
          }
        }
      }
    }
  }

  return features
}
