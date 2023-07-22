<script setup lang="ts">
import FeatureStep from '@/modules/feature/FeatureStep.vue'
import { Feature } from '@/modules/feature/feature'
import { createFeatureBoard } from '@/modules/feature/feature-board'
import { featureSteps } from '@/modules/feature/feature-steps'
import { sumElements } from '@/utils'
import { computed, onMounted, ref } from 'vue'

const featureBoard = createFeatureBoard()

const features = ref<Feature[]>([])

const meanComplexity = computed(
  () =>
    sumElements(features.value.map((feature) => feature.complexity)) /
    features.value.length
)

const meanLeadTime = computed(
  () =>
    sumElements(features.value.map((feature) => feature.leadTime)) /
    features.value.length
)

onMounted(() => (features.value = featureBoard.initBoard(featureSteps)))

const nextDay = () => {
  features.value = featureBoard.nextDay(features.value)
}

const featuresGroupedByStep = computed(() => {
  const groupedByStep: Record<number, Feature[]> = {}

  features.value.forEach((feature) => {
    if (!groupedByStep[feature.step]) {
      groupedByStep[feature.step] = [feature]
    } else {
      groupedByStep[feature.step].push(feature)
    }
  })

  return groupedByStep
})
</script>

<template>
  <div class="dashboard">
    <div>
      mean complexity : {{ meanComplexity }}, mean lead time :
      {{ meanLeadTime }} days
    </div>
    <div>
      <button @click="nextDay">next day</button>
    </div>
  </div>
  <ul class="features-steps">
    <FeatureStep
      v-for="step in featureSteps"
      :key="step.title"
      :step="step"
      :features="featuresGroupedByStep[step.stepIndex] ?? []"
    />
  </ul>
</template>

<style scoped lang="scss">
.dashboard,
pre {
  color: black;
}

.features-steps {
  display: flex;
  flex: 1;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 0 1rem;
  border: 3px solid var(--background-color);

  li:first-child {
    margin-left: 1rem;
  }

  li:last-child {
    margin-right: 1rem;
  }

  li:not(:last-child) {
    padding-right: 1rem;
    border-radius: 0;
  }

  li {
    flex: 1;
    min-height: 100%;
    margin: 0;
    color: var(--background-color);
    display: flex;
    flex-direction: column;
  }
}
</style>
