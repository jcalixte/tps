<script setup lang="ts">
import { useFeatureStore } from '@/modules/feature/feature-store'

defineProps<{
  featuresToDeliver: number
}>()
const featureStore = useFeatureStore()
</script>

<template>
  <div class="feature-controls">
    <div>
      {{ featureStore.features.length }} / {{ featuresToDeliver }} features in
      the board | mean complexity : {{ featureStore.meanComplexity }} | mean
      lead time : {{ featureStore.meanLeadTime }} days | Total days:
      {{ featureStore.meta.totalDays }} | Team work experience:
      {{ featureStore.meta.teamWorkExperience.toFixed(2) }}
    </div>
    <div class="row">
      New feature live every {{ featureStore.taktTime }} days. Finishing in
      {{ featureStore.eat }} days.
    </div>
    <template v-if="!featureStore.isProjectFinished">
      <div class="row">Strategy of the day:</div>
      <div class="row">
        <button @click="featureStore.nextDay('push')">push system</button>
        <button @click="featureStore.nextDay('pull')">pull system</button>
        <button @click="featureStore.nextDay('problem-solving')">
          problem solving
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.feature-controls {
  color: black;
}
</style>
