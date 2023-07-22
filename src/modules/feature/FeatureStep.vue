<script setup lang="ts">
import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { computed } from 'vue'

const props = defineProps<{
  step: FeatureStep
  features: Feature[]
}>()
const featuresInProgress = computed(() =>
  props.features.filter((feature) => feature.status === 'doing')
)
const featuresDone = computed(() =>
  props.features.filter((feature) => feature.status === 'done')
)

const remainingBlueBuckets = computed(() =>
  Math.max(0, props.step.blueBuckets - featuresDone.value.length)
)
const hasFeaturesInProgress = computed(
  () => featuresInProgress.value.length > 0
)
const hasFeaturesDone = computed(() => featuresDone.value.length > 0)
const isLive = computed(
  () => props.step.title.toLocaleLowerCase() === 'release'
)
</script>

<template>
  <li class="feature-step">
    <header>{{ step.title }}</header>
    <section class="doing">
      <h5>📝⌛</h5>
      <ul v-if="hasFeaturesInProgress">
        <li
          v-for="feature in featuresInProgress"
          :key="feature.name"
          class="bin"
        >
          <div>
            {{ feature.name }}
          </div>
          <div class="lead-time">{{ feature.leadTime }} days</div>
        </li>
      </ul>
    </section>
    <section class="done">
      <h5>📝✅</h5>
      <ul v-if="hasFeaturesDone">
        <li
          v-for="feature in featuresDone"
          :key="feature.name"
          class="bin"
          :class="{ 'green-bin': isLive }"
        >
          <div>
            {{ feature.name }}
          </div>
          <div class="lead-time">{{ feature.leadTime }} days</div>
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
@import url('https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap');

.feature-step {
  --success-color: #20bf6b;

  header {
    padding: 0.5rem;
    border: solid 2px var(--background-color);
    margin-top: 1rem;
  }

  section {
    margin: 1rem 0;
    flex: 1;
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
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12pt;
    padding: 0 0.5rem;
    text-align: center;
  }

  .blue-bin {
    background-color: var(--background-color);
    color: white;
    font-size: 18pt;
  }

  .green-bin {
    background-color: var(--success-color);
    border: 3px solid var(--success-color);
    color: white;
  }

  li {
    flex-direction: column;
  }

  .lead-time {
    font-family: 'Cutive Mono', monospace;
    font-weight: bold;
  }
}
</style>
