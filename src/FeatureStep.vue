<script setup lang="ts">
import { FeatureStep } from '@/feature-steps'
import { computed } from 'vue'

const props = defineProps<{
  step: FeatureStep
}>()
const remainingBlueBuckets = computed(() =>
  Math.max(0, props.step.blueBuckets - props.step.featuresDone.length)
)
</script>

<template>
  <li class="feature-step">
    <header>{{ step.title }}</header>
    <section class="doing">
      <h5>📝</h5>
      <ul v-if="step.featuresInProgress.length > 0">
        <li v-for="feature in step.featuresInProgress" :key="feature">
          {{ feature }}
        </li>
      </ul>
    </section>
    <section class="done">
      <h5>✅</h5>
      <ul v-if="step.featuresDone.length > 0">
        <li v-for="feature in step.featuresDone" :key="feature">
          {{ feature }}
        </li>
      </ul>
      <div
        v-for="blueBucket in remainingBlueBuckets"
        :key="blueBucket"
        class="blue-bin"
      >
        Blue bucket
      </div>
    </section>
  </li>
</template>

<style scoped lang="scss">
.feature-step {
}
</style>
