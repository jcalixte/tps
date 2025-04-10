<script setup lang="ts">
import FeatureItem from '@/modules/pull-system/feature/FeatureItem.vue'
import { Feature } from '@/modules/pull-system/feature/feature'
import { FeatureStep } from '@/modules/pull-system/feature/feature-steps'
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Starport } from 'vue-starport'

const props = defineProps<{
  prefix: string
  step: FeatureStep
  features: Feature[]
}>()
const featuresInProgress = computed(() =>
  props.features.filter((feature) => feature.status === 'doing')
)
const featuresDone = computed(() =>
  props.step.title === 'Release'
    ? props.features
        .filter((feature) => feature.status === 'done')
        .sort((a, b) => (a.leadTime > b.leadTime ? -1 : 1))
    : props.features.filter((feature) => feature.status === 'done')
)

const hasFeaturesInProgress = computed(
  () => featuresInProgress.value.length > 0
)
const isLive = computed(
  () => props.step.title.toLocaleLowerCase() === 'release'
)

const binContainer = ref<HTMLElement | null>(null)

const { width } = useElementSize(binContainer)

const binContainerWidth = computed(() => {
  if (!width) {
    return ''
  }
  return `width: ${width.value}px`
})
</script>

<template>
  <li class="feature-step">
    <header>{{ step.title }}</header>
    <section class="doing">
      <h5>⚒️ [{{ featuresInProgress.length }}]</h5>
      <ul v-if="hasFeaturesInProgress">
        <li v-for="feature in featuresInProgress" :key="feature.name">
          <Starport
            :port="`${props.prefix}-${feature.name}`"
            style="height: var(--feature-item-height)"
          >
            <FeatureItem :feature="feature" />
          </Starport>
        </li>
      </ul>
    </section>
    <section class="done">
      <h5>
        ✅ [{{ featuresDone.length
        }}<template v-if="!isLive">/{{ step.blueBins }}</template
        >]
      </h5>
      <div ref="binContainer">
        <div
          v-if="!isLive"
          class="blue-bin-container"
          :style="binContainerWidth"
        >
          <div
            v-for="blueBin in step.blueBins"
            :key="blueBin"
            class="bin blue-bin"
          >
            blue bin
          </div>
        </div>
        <div v-if="isLive" class="live">
          <span v-if="featuresDone.length === 0">No features live yet</span>
          <span v-else>
            {{ featuresDone.length }} feature<template
              v-if="featuresDone.length > 1"
              >s</template
            >
            live!
          </span>
        </div>
        <ul class="done-list">
          <li v-for="feature in featuresDone" :key="feature.name">
            <Starport
              :port="`${props.prefix}-${feature.name}`"
              style="height: var(--feature-item-height)"
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
  min-width: 235px;

  header {
    padding: 0.5rem;
    margin-top: 1rem;
  }

  section {
    @include hideScrollbar();
    margin: 1rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    max-height: 40vh;
  }

  h5 {
    margin: 0;
    background-color: var(--primary-color);
    padding: 0.35rem;
    text-align: center;
    color: var(--color);
  }

  ul {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      z-index: 1;
    }
  }

  .bin {
    height: var(--feature-item-height);
    border: none;
  }

  .blue-bin-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.5rem;
    z-index: 0;
  }

  /* mobile screen */
  @media only screen and (max-width: 750px) {
    .blue-bin-container {
      display: none;
    }
  }

  .live {
    text-align: center;
  }
}
</style>
