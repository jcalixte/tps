<script setup lang="ts">
import { Feature } from '@/modules/feature/feature'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ feature: Feature; isLive?: boolean }>(),
  { isLive: false }
)
const hasQualityIssues = computed(() => props.feature.qualityIssue > 0)
</script>

<template>
  <div class="feature-item bin" :class="{ live: isLive }">
    <div>
      {{ feature.name }}
    </div>
    <div class="numeric">
      ({{ feature.complexity }})
      <div class="indicator">
        <div class="lead-time numeric">{{ feature.leadTime }} days</div>
        <div v-if="hasQualityIssues" class="red-bin">
          {{ feature.qualityIssue }} 🔴
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.feature-item {
  transition-property: opacity, visibility;
  transition-duration: 0.8s;
  transition-timing-function: ease-out;
  transition-delay: 1s 2s;

  display: flex;
  flex-direction: row;
  gap: 1rem;

  &.live {
    visibility: hidden;
    opacity: 0;
  }

  .indicator {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    flex-wrap: wrap;
  }

  .red-bin {
    border: 2px solid #ff7979;
    padding: 0 0.5rem 0.1rem;
  }
}
</style>
