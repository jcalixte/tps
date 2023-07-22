export type FeatureStatus = 'doing' | 'done'

export type Feature = {
  name: string
  complexity: number
  leadTime: number
  status: FeatureStatus
  step: number
  qualityIssue: number
}
