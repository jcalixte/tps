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
  props.features
    .filter((feature) => feature.status === 'done')
    .sort((a, b) => (a.leadTime > b.leadTime ? -1 : 1))
)

const remainingBlueBuckets = computed(() =>
  Math.max(0, props.step.blueBuckets - featuresDone.value.length)
)
const hasFeaturesInProgress = computed(
  () => featuresInProgress.value.length > 0
)
const isLive = computed(
  () => props.step.title.toLocaleLowerCase() === 'release'
)
</script>

<template>
  <li class="feature-step">
    <header>{{ step.title }}</header>
    <section class="doing">
      <h5>📝⌛ ({{ featuresInProgress.length }})</h5>
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
      <h5>📝✅ ({{ featuresDone.length }})</h5>
      <div>
        <div class="blue-bin-container">
          <div
            v-for="blueBucket in remainingBlueBuckets"
            :key="blueBucket"
            class="bin blue-bin"
          >
            Blue bucket
          </div>
        </div>
        <div v-if="isLive" class="live">
          {{ featuresDone.length }} features live!
        </div>
        <ul class="done-list">
          <li v-for="feature in featuresDone" :key="feature.name">
            <Starport
              :port="feature.name"
              style="height: calc(var(--feature-item-height) + 0.2rem)"
            >
              <FeatureItem :feature="feature" :is-live="isLive" />
            </Starport>
          </li>
        </ul>
      </div>
    </section>
  </li>
</template>

<style scoped lang="scss">
@mixin hideScrollbar {
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.feature-step {
  display: flex;
  flex-direction: column;

  header {
    padding: 0.5rem;
    border: solid 2px var(--background-color);
    margin-top: 1rem;
  }

  section {
    @include hideScrollbar();
    margin: 1rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 40vh;
  }

  h5 {
    margin: 0;
    background-color: var(--background-color);
    padding: 0.35rem;
    text-align: center;
    color: white;
  }

  li {
    flex-direction: column;
  }

  .done-list {
    flex: 1;
  }

  .live {
    text-align: center;
  }
}
</style>
