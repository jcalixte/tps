import { newsAppFeatures } from '@/data/app-feature'
import { birds } from '@/data/bird'
import { Feature } from '@/modules/pull-system/feature/feature'
import { randomInteger } from '@/utils'

export const features: Feature[] = birds.map((name) => ({
  name,
  complexity: randomInteger(1, 5),
  leadTime: 0,
  status: 'doing',
  step: Infinity,
  qualityIssue: 0
}))

export const birdFeatures: readonly Feature[] = birds.map((name) => ({
  name,
  complexity: randomInteger(1, 5),
  leadTime: 0,
  status: 'doing',
  step: Infinity,
  qualityIssue: 0
}))

export const mobileAppFeatures: readonly Feature[] = newsAppFeatures.map(
  (name) => ({
    name,
    complexity: randomInteger(1, 5),
    leadTime: 0,
    status: 'doing',
    step: Infinity,
    qualityIssue: 0
  })
)
