import { dogs } from '@/data/dog'
import { Feature } from '@/modules/feature/feature'

export const features: Feature[] = dogs.map((name) => ({
  name,
  complexity: Math.floor(Math.random() * 6),
  leadTime: 0,
  status: 'doing',
  step: Infinity,
  qualityIssue: 0
}))
