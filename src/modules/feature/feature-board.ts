import { Feature, FeatureStatus } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { features as initialFeatures } from '@/modules/feature/feature.fixture'
import { Strategy } from '@/modules/lean/strategy'
import { FeatureState } from '@/store-type'
import {
  getMean,
  pickRandomElement,
  popNElement,
  randomFloat,
  shuffleArray,
  sumElements
} from '@/utils'

const HARD_STOP = 5000

const getQualityIssue = ({
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
  const quality = randomFloat(0, 1)

  return quality > qualityProbability / multiplicator
}

const mayBeInProgress = ({
  features,
  feature,
  strategy,
  steps
}: {
  features: Feature[]
  feature: Feature
  steps: FeatureStep[]
  strategy: Strategy
}): FeatureStatus => {
  if (strategy !== 'pull') {
    return 'doing'
  }

  const nextStep = steps.find((step) => step.stepIndex === feature.step - 1)

  if (!nextStep) {
    return feature.status
  }

  const hasBlueBinAvailableNextStep =
    nextStep.blueBins -
      features.filter((f) => f.step === feature.step - 1).length >
    0

  if (hasBlueBinAvailableNextStep) {
    return 'doing'
  }

  return feature.status
}

export const newBacklog = (limit?: number) =>
  limit !== undefined
    ? popNElement(shuffleArray(initialFeatures), limit)
    : shuffleArray(initialFeatures)

export const initBoard = (
  steps: FeatureStep[],
  features: Feature[]
): Feature[] => {
  const initialFeatures = popNElement(features, 10)

  initialFeatures.forEach((feature) => {
    const step = pickRandomElement(steps)
    feature.status = pickRandomElement(['doing', 'done'])
    feature.step = Math.max(step.stepIndex, 1)
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
    .sort((a, b) => (a.step < b.step ? -1 : 1))
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
          feature.status = mayBeInProgress({
            features,
            feature,
            steps,
            strategy
          })

          if (feature.status === 'done') {
            break
          }

          const hasQualityIssue = getQualityIssue({
            complexity: feature.complexity,
            tasksInParallel: features.filter(
              (f) => f.status === 'doing' && f.step === feature.step
            ).length,
            teamWorkExperience
          })

          if (hasQualityIssue) {
            feature.qualityIssue++
          } else {
            // moving to the next team
            feature.step--
          }
          break
      }
    })

  if (backlog.length > 0) {
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
      return 1.5
    case 3:
      return 5
    case 4:
      return 8
    case 5:
      return 13
    default:
      return 25
  }
}

const getQualityProbability = (
  complexity: number,
  teamWorkExperience: number
) => {
  let probabilityOfGoodQuality = 1

  switch (complexity) {
    case 1:
      probabilityOfGoodQuality = 0.95

    case 2:
      probabilityOfGoodQuality = 0.88
      break
    case 3:
      probabilityOfGoodQuality = 0.72
      break
    case 4:
      probabilityOfGoodQuality = 0.65
      break
    case 5:
      probabilityOfGoodQuality = 0.5
      break
  }

  // team learning
  probabilityOfGoodQuality =
    probabilityOfGoodQuality + (1.2 * teamWorkExperience) / 100

  return probabilityOfGoodQuality
}

export const isFeatureDone = (feature: Feature) =>
  feature.step === 0 && feature.status === 'done'

export const nextDay = (
  state: FeatureState,
  strategy: Strategy | 'problem-solving'
): FeatureState => {
  state.meta.totalDays++
  // each day, the teams know how to better work together
  state.meta.teamWorkExperience += 0.01

  if (strategy === 'problem-solving') {
    const hasTeamLearned = randomFloat(0, 1) > 0.25
    if (hasTeamLearned) {
      state.meta.teamWorkExperience += 1.2
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
    if (strategy.includes('dps')) {
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
