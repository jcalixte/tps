import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { Strategy } from '@/modules/lean/strategy'

export type Meta = {
  totalDays: number
  daysWithProblemSolving: number
  strategy: Record<Strategy, number>
}

export type Analysis = {
  worstFeature: Feature
  meanQualityIssue: number
  meanComplexity: number
  meanLeadTime: number
  mainStrategy: Strategy | string
}

export type Dashboard = Array<{
  uuid: string
  meta: Meta
  analysis: Analysis
}>

export type State = {
  steps: FeatureStep[]
  features: Feature[]
  backlog: Feature[]
  meta: Meta
  dashboards: Dashboard
}
