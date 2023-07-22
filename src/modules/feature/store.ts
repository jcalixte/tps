import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { defineStore } from 'pinia'

type State = {
  steps: FeatureStep[]
  features: Feature[]
}

export const featureStore = defineStore('feature', {
  state: (): State => ({
    steps: [],
    features: []
  })
})
