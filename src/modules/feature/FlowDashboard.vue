<script setup lang="ts">
import ProblemSolvingIcon from '@/icons/ProblemSolvingIcon.vue'
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
import { useFeatureStore } from '@/modules/feature/feature-store'

const featureStore = useFeatureStore()
</script>

<template>
  <div class="flow-dashboard">
    <div>
      {{ featureStore.totalFeaturesDone }} /
      {{ featureStore.totalFeaturesCount }} features in the board | mean
      complexity : {{ featureStore.meanComplexity }} | mean lead time :
      {{ featureStore.meanLeadTime }} days | Total days:
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
        <button @click="featureStore.nextDay('push')">
          <PushSystemIcon color="white" />
        </button>
        <button @click="featureStore.nextDay('pull')">
          <PullSystemIcon color="white" />
        </button>
        <button @click="featureStore.nextDay('problem-solving')">
          <ProblemSolvingIcon color="white" />
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.flow-dashboard {
  color: black;
  font-size: 16pt;
}
</style>
