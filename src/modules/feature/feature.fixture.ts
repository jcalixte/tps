import { birds } from '@/data/bird'
import { Feature } from '@/modules/feature/feature'

export const features: Feature[] = birds.map((name) => ({
  name,
  complexity: Math.floor(Math.random() * 5) + 1,
  leadTime: 0,
  status: 'doing',
  step: Infinity,
  qualityIssue: 0
}))
