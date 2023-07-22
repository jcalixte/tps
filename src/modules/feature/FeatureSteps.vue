<script setup lang="ts">
import FeatureStep from '@/modules/feature/FeatureStep.vue'
import { Feature } from '@/modules/feature/feature'
import { createFeatureBoard } from '@/modules/feature/feature-board'
import { featureSteps } from '@/modules/feature/feature-steps'
import { sumElements } from '@/utils'
import { computed, onMounted, ref } from 'vue'

const featureBoard = createFeatureBoard()

const totalDays = ref(0)
const features = ref<Feature[]>([])

const meanComplexity = computed(
  () =>
    Math.round(
      100 *
        (sumElements(features.value.map((feature) => feature.complexity)) /
          features.value.length)
    ) / 100
)

const meanLeadTime = computed(
  () =>
    Math.round(
      100 *
        (sumElements(features.value.map((feature) => feature.leadTime)) /
          features.value.length)
    ) / 100
)

onMounted(() => (features.value = featureBoard.initBoard(featureSteps)))

const nextDay = () => {
  totalDays.value++
  features.value = featureBoard.nextDay(
    features.value,
    featureSteps[0].stepIndex
  )
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
      Total days: {{ totalDays }}
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
