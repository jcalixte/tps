<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'

withDefaults(defineProps<{ color: string }>(), {
  color: 'var(--primary-color)'
})
</script>

<template>
  <BaseIcon :color="color">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M20 12l-10 0" />
    <path d="M20 12l-4 4" />
    <path d="M20 12l-4 -4" />
    <path d="M4 4l0 16" />
  </BaseIcon>
</template>
