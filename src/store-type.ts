import type { Feature } from '@/modules/pull-system/feature/feature'
import type { FeatureStep } from '@/modules/pull-system/feature/feature-steps'
import type { Strategy } from '@/modules/pull-system/lean/strategy'

export type Meta = {
  totalDays: number
  teamWorkExperience: number
  strategy: Record<Strategy, number>
  featuresDonePerDay: number[]
}

export type Analysis = {
  worstFeature: Feature
  meanQualityIssue: number
  meanComplexity: number
  meanLeadTime: number
  strategy: Strategy | string
}

export type Dashboard = {
  uuid: string
  meta: Meta
  analysis: Analysis
}

export type FeatureState = {
  steps: FeatureStep[]
  features: Feature[]
  backlog: Feature[]
  meta: Meta
}
