<script setup lang="ts">
defineProps<{
  qualityIssue: number
}>()
</script>

<template>
  <div class="quality-issue red-bin numeric">{{ qualityIssue }}</div>
</template>

<style scoped lang="scss">
.quality-issue {
  &.red-bin {
    --warning-color: #ca0e0e;
    border: 2px solid var(--warning-color);
    padding: 0 0.5rem 0.1rem;
    color: var(--warning-color);
  }
}
</style>
