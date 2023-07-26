import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { features as initialFeatures } from '@/modules/feature/feature.fixture'
import { Strategy } from '@/modules/lean/strategy'
import { FeatureState } from '@/store-type'
import {
  getMean,
  pickRandomElement,
  popNElement,
  shuffleArray,
  sumElements
} from '@/utils'

const MAX_FEATURES = 200
const HARD_STOP = 5000

const hasQualityIssue = ({
  complexity,
  tasksInParallel,
  teamWorkExperience
}: {
  complexity: number
  tasksInParallel: number
  teamWorkExperience: number
}): boolean => {
  const qualityProbability = getQualityProbability(
    complexity,
    teamWorkExperience
  )

  const multiplicator = getOverburdenMultiplicator(tasksInParallel)
  const quality = Math.random()

  return quality > qualityProbability / multiplicator
}

export const newBacklog = () => shuffleArray(initialFeatures)

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
  teamWorkExperience
}: {
  backlog: Feature[]
  features: Feature[]
  steps: FeatureStep[]
  initialStep: number
  strategy: Strategy | 'problem-solving'
  teamWorkExperience: number
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

          if (feature.status === 'done') {
            break
          }

          if (
            hasQualityIssue({
              complexity: feature.complexity,
              tasksInParallel: features.filter(
                (f) => f.status === 'doing' && f.step === feature.step
              ).length,
              teamWorkExperience
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
        const [nextFeature] = popNElement(backlog, 1)

        if (nextFeature) {
          features.push({ ...nextFeature, step: initialStep })
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
      return 1.1
    case 3:
      return 1.3
    case 4:
      return 1.6
    case 5:
      return 2.2
    case 6:
      return 3.2
    case 7:
      return 4.5
    case 8:
      return 6
    default:
      return 8
  }
}

const getQualityProbability = (
  complexity: number,
  teamWorkExperience: number
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
    probabilityOfGoodQuality + (1.2 * teamWorkExperience) / 100

  return probabilityOfGoodQuality
}

const isFeatureDone = (feature: Feature) =>
  feature.step === 0 && feature.status === 'done'

export const nextDay = (
  state: FeatureState,
  strategy: Strategy | 'problem-solving'
): FeatureState => {
  state.meta.totalDays++

  if (strategy === 'problem-solving') {
    const hasTeamLearned = Math.random() > 0.25
    if (hasTeamLearned) {
      state.meta.teamWorkExperience++
    }
  } else {
    state.meta.strategy[strategy]++
  }

  const [backlog, features] = getFeaturesForNextDay({
    backlog: state.backlog,
    features: state.features,
    steps: state.steps,
    initialStep: state.steps[0].stepIndex,
    strategy,
    teamWorkExperience: state.meta.teamWorkExperience
  })
  state.backlog = backlog
  state.features = features

  const featuresDone = sumElements(state.meta.featuresDonePerDay) ?? 0
  const featuresDoneNextDay = features.filter(isFeatureDone).length

  state.meta.featuresDonePerDay.push(featuresDoneNextDay - featuresDone)

  return state
}

export const isProjectFinished = (features: Feature[]) =>
  features.every(isFeatureDone)

export const getMeanComplexity = (features: Feature[]) => {
  return getMean(features.map((feature) => feature.complexity))
}

export const getMeanLeadTime = (features: Feature[]) => {
  return getMean(features.map((feature) => feature.leadTime))
}

export const getMeanQualityIssue = (features: Feature[]) => {
  return getMean(features.map((feature) => feature.qualityIssue))
}

export const simulate = (
  state: FeatureState,
  strategy: Strategy
): FeatureState => {
  let i = 0

  while (!isProjectFinished(state.features) && i++ < HARD_STOP) {
    if (strategy === 'pull-dps' || strategy === 'push-dps') {
      if (state.meta.totalDays % 5 === 0) {
        state = nextDay(state, 'problem-solving')
      } else {
        state = nextDay(state, strategy.split('-')[0] as Strategy)
      }
    } else {
      state = nextDay(state, strategy)
    }
  }

  return state
}
