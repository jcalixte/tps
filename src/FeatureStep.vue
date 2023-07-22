<script setup lang="ts">
import { FeatureStep } from '@/feature-steps'
import { computed } from 'vue'

const props = defineProps<{
  step: FeatureStep
}>()
const remainingBlueBuckets = computed(() =>
  Math.max(0, props.step.blueBuckets - props.step.featuresDone.length)
)
const hasFeaturesInProgress = computed(
  () => props.step.featuresInProgress.length > 0
)
const hasFeaturesDone = computed(() => props.step.featuresInProgress.length > 0)
</script>

<template>
  <li class="feature-step">
    <header>{{ step.title }}</header>
    <section class="doing">
      <h5>📝⌛</h5>
      <ul v-if="hasFeaturesInProgress">
        <li
          v-for="feature in step.featuresInProgress"
          :key="feature"
          class="bin"
        >
          {{ feature }}
        </li>
      </ul>
    </section>
    <section class="done">
      <h5>📝✅</h5>
      <ul v-if="hasFeaturesDone">
        <li v-for="feature in step.featuresDone" :key="feature" class="bin">
          {{ feature }}
        </li>
      </ul>
      <div
        v-for="blueBucket in remainingBlueBuckets"
        :key="blueBucket"
        class="bin blue-bin"
      >
        Blue bucket
      </div>
    </section>
  </li>
</template>

<style scoped lang="scss">
.feature-step {
  header {
    padding: 0.5rem;
    border: solid 2px var(--background-color);
    margin-top: 1rem;
  }

  section {
    margin: 1rem 0;
    flex: 1;
  }

  section ul {
    padding: 1rem;
  }

  h5 {
    margin-bottom: 0;
    background-color: var(--background-color);
    padding: 0.35rem;
    text-align: center;
  }

  .bin {
    margin-top: 1rem;
    border: 3px solid var(--background-color);
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .blue-bin {
    background-color: var(--background-color);
    color: white;
  }
}
</style>
