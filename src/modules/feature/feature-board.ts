import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { features as initialFeatures } from '@/modules/feature/feature.fixture'
import { State } from '@/modules/feature/store-type'
import { Strategy } from '@/modules/lean/strategy'
import {
  pickRandomElement,
  popNElement,
  shuffleArray,
  sumElements
} from '@/utils'

const MAX_FEATURES = 30
const HARD_STOP = 5000

const hasQualityIssue = ({
  complexity,
  tasksInParallel,
  daysWithProblemSolving
}: {
  complexity: number
  tasksInParallel: number
  daysWithProblemSolving: number
}): boolean => {
  const qualityProbability = getQualityProbability(
    complexity,
    daysWithProblemSolving
  )

  let multiplicator = getOverburdenMultiplicator(tasksInParallel)
  const quality = Math.random()

  return quality > qualityProbability / multiplicator
}

export const newBoard = () => shuffleArray(initialFeatures)

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

export const getFeaturesForNextDay = ({
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
}): [Feature[], Feature[]] => {
  features
    .filter((feature) => feature.step > 0 || feature.status === 'doing')
    .forEach((feature) => {
      feature.leadTime++

      if (strategy === 'problem-solving') {
        return
      }

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

          if (feature.status === 'doing') {
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

  return [backlog, features]
}

const getOverburdenMultiplicator = (tasksInParallel: number) => {
  switch (tasksInParallel) {
    case 1:
      return 1
    case 2:
      return 1.05
    case 3:
      return 1.08
    case 4:
      return 1.1
    case 5:
      return 1.15
    case 6:
      return 1.25
    case 7:
      return 1.35
    case 8:
      return 1.4
    default:
      return 1.5
  }
}

const getQualityProbability = (
  complexity: number,
  daysWithProblemSolving: number
) => {
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

  // team learning
  probabilityOfGoodQuality =
    probabilityOfGoodQuality + (1.2 * daysWithProblemSolving) / 100

  return probabilityOfGoodQuality
}

export const nextDay = (state: State, strategy: Strategy): State => {
  state.meta.totalDays++
  state.meta.strategy[strategy]++

  if (strategy === 'problem-solving') {
    state.meta.daysWithProblemSolving++
  }

  const [backlog, features] = getFeaturesForNextDay({
    backlog: state.backlog,
    features: state.features,
    steps: state.steps,
    initialStep: state.steps[0].stepIndex,
    strategy,
    daysWithProblemSolving: state.meta.daysWithProblemSolving
  })

  state.backlog = backlog
  state.features = features

  return state
}

export const isProjectFinished = (features: Feature[]) =>
  features.every((feature) => feature.step === 0 && feature.status === 'done')

export const meanComplexity = (features: Feature[]) => {
  return (
    Math.round(
      100 *
        (sumElements(features.map((feature) => feature.complexity)) /
          features.length)
    ) / 100
  )
}

export const meanLeadTime = (features: Feature[]) => {
  return (
    Math.round(
      100 *
        (sumElements(features.map((feature) => feature.leadTime)) /
          features.length)
    ) / 100
  )
}

export const meanQualityIssue = (features: Feature[]) => {
  return (
    Math.round(
      100 *
        (sumElements(features.map((feature) => feature.qualityIssue)) /
          features.length)
    ) / 100
  )
}

export const simulate = (state: State, strategy: Strategy): State => {
  let i = 0

  while (!isProjectFinished(state.features) && i++ < HARD_STOP) {
    if (strategy === 'problem-solving') {
      if (state.meta.totalDays % 5 === 0) {
        state = nextDay(state, 'problem-solving')
      } else {
        state = nextDay(state, 'pull')
      }
    } else {
      state = nextDay(state, strategy)
    }
  }

  return state
}
