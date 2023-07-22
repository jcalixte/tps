<script setup lang="ts">
import { Feature } from '@/modules/feature/feature'
import { computed } from 'vue'

const props = defineProps<{ feature: Feature }>()
const hasQualityIssues = computed(() => props.feature.qualityIssue > 0)
</script>

<template>
  <div class="feature-item bin">
    <div>
      {{ feature.name }}
      <span class="numeric">({{ feature.complexity }})</span>
    </div>
    <div class="lead-time numeric">{{ feature.leadTime }} days</div>
    <div v-if="hasQualityIssues" class="red-bin numeric">
      {{ feature.qualityIssue }} 🔴
    </div>
  </div>
</template>

<style scoped lang="scss">
.feature-item {
  .red-bin {
    border: 2px solid #ff7979;
    padding: 0 0.5rem 0.1rem;
  }
}
</style>
