<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'

withDefaults(defineProps<{ color: string }>(), {
  color: 'var(--primary-color)'
})
</script>

<template>
  <BaseIcon :color="color" class="separator">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 12l0 .01" />
    <path d="M7 12l10 0" />
    <path d="M21 12l0 .01" />
  </BaseIcon>
</template>

<style scoped>
.separator {
  margin: 1rem 0;
}
</style>
