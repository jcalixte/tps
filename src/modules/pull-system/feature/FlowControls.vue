<script setup lang="ts">
import EraserIcon from '@/icons/EraserIcon.vue'
import ProblemSolvingIcon from '@/icons/ProblemSolvingIcon.vue'
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
import { useFeatureStore } from '@/modules/pull-system/feature/feature-store'

const NUMBER_OF_FEATURES = 20

withDefaults(defineProps<{ withEraser?: boolean }>(), { withEraser: true })

const featureStore = useFeatureStore()
</script>

<template>
  <div class="flow-controls">
    <div class="row">
      <button
        @click="featureStore.nextDay('push')"
        :disabled="featureStore.isProjectFinished"
      >
        <PushSystemIcon color="white" />
      </button>
      <button
        @click="featureStore.nextDay('pull')"
        :disabled="featureStore.isProjectFinished"
      >
        <PullSystemIcon color="white" />
      </button>
      <!--
      [dps]
      <button @click="featureStore.nextDay('problem-solving')" :disabled="featureStore.isProjectFinished">
        <ProblemSolvingIcon color="white" />
      </button> -->
      <button
        v-if="withEraser"
        @click="featureStore.initBoard('mobile-app', NUMBER_OF_FEATURES)"
      >
        <EraserIcon color="white" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flow-controls {
  .row {
    display: flex;
    justify-content: center;

    button {
      margin: 1rem 0;
    }
  }
}
</style>
