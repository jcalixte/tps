<script setup lang="ts">
import FeatureItem from '@/modules/feature/FeatureItem.vue'
import { Feature } from '@/modules/feature/feature'
import { FeatureStep } from '@/modules/feature/feature-steps'
import { computed } from 'vue'
import { Starport } from 'vue-starport'

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
        <li v-for="feature in featuresInProgress" :key="feature.name">
          <Starport
            :port="feature.name"
            style="height: var(--feature-item-height)"
          >
            <FeatureItem :feature="feature" />
          </Starport>
        </li>
      </ul>
    </section>
    <section class="done">
      <h5>📝✅</h5>
      <div
        v-for="blueBucket in remainingBlueBuckets"
        :key="blueBucket"
        class="bin blue-bin"
      >
        Blue bucket
      </div>
      <ul class="done-list" v-if="hasFeaturesDone">
        <li v-for="feature in featuresDone" :key="feature.name">
          <Starport
            :port="feature.name"
            style="height: var(--feature-item-height)"
          >
            <FeatureItem :feature="feature" />
          </Starport>
        </li>
      </ul>
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
    display: flex;
    flex-direction: column;
  }

  h5 {
    margin-bottom: 0;
    background-color: var(--background-color);
    padding: 0.35rem;
    text-align: center;
  }

  li {
    flex-direction: column;
  }

  .done-list {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
