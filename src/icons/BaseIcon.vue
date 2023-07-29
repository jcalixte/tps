<script setup lang="ts">
withDefaults(defineProps<{ color?: string }>(), {
  color: 'var(--primary-color)'
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-search"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    stroke-width="3"
    :stroke="color"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <slot />
  </svg>
</template>

<style>
svg {
  vertical-align: text-bottom;
}
</style>
