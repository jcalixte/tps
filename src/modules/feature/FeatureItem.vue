<script setup lang="ts">
import { Feature } from '@/modules/feature/feature'
import { computed } from 'vue'

const props = defineProps<{ feature: Feature }>()
const hasQualityIssues = computed(() => props.feature.qualityIssue > 0)
</script>

<template>
  <div class="feature-item">
    <div class="bin">
      <div>
        {{ feature.name }}
        <span class="numeric">({{ feature.complexity }})</span>
      </div>
      <div class="lead-time numeric">{{ feature.leadTime }} days</div>
      <div v-if="hasQualityIssues" class="red-bin numeric">
        {{ feature.qualityIssue }} issues
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.feature-item {
  .red-bin {
    background-color: #ff7979;
    padding: 0 0.5rem;
  }
}
</style>
