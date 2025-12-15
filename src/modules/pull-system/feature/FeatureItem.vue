<script setup lang="ts">
import QualityIssue from '@/modules/pull-system/feature/QualityIssue.vue'
import { Feature } from '@/modules/pull-system/feature/feature'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ feature: Feature; isLive?: boolean }>(),
  { isLive: false }
)
const hasQualityIssues = computed(() => props.feature.qualityIssue > 0)
</script>

<template>
  <div class="feature-item bin" :class="{ live: isLive }">
    <div class="feature-name">
      <!--  [complexity]
      <span class="numeric">({{ feature.complexity }})</span> -->
      {{ feature.name }}
    </div>
    <div class="numeric">
      {{ feature.leadTime }}d
      <QualityIssue
        v-if="hasQualityIssues"
        :quality-issue="feature.qualityIssue"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.feature-item {
  transition-property: opacity, visibility;
  transition-duration: 0.9s;
  transition-timing-function: ease-out;
  transition-delay: 1s 2s;

  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;

  &.live {
    visibility: hidden;
    opacity: 0;
  }

  .feature-name {
    flex: 1;
  }
}
</style>
