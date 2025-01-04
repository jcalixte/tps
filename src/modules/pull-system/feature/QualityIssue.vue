<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
  qualityIssue: number
}>()

const qualityIssue = computed(() => props.qualityIssue)
const isFlashing = ref(false)
const flashingDuration = 300
const flashingTransitionDuration = `${flashingDuration / 1000 + 0.1}s`

watchEffect(() => {
  if (qualityIssue.value > 0) {
    isFlashing.value = true
    setTimeout(() => {
      isFlashing.value = false
    }, flashingDuration)
  }
})
</script>

<template>
  <div
    class="quality-issue red-bin numeric"
    :class="{ 'is-flashing': isFlashing }"
  >
    {{ qualityIssue }}
  </div>
</template>

<style scoped lang="scss">
.quality-issue {
  --warning-color: #ca0e0e;
  transition: v-bind(flashingTransitionDuration) ease-out;
  transition-property: background-color, color;

  &.red-bin {
    border: 2px solid var(--warning-color);
    padding: 0 0.5rem 0.1rem;
    color: var(--warning-color);
  }

  &.is-flashing {
    background-color: var(--warning-color);
    color: var(--color);
  }
}
</style>
