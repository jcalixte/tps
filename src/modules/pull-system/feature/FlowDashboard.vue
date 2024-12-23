<script setup lang="ts">
import SeparatorIcon from '@/icons/SeparatorIcon.vue'
import FlowControls from '@/modules/pull-system/feature/FlowControls.vue'
import { useFeatureStore } from '@/modules/pull-system/feature/feature-store'

const featureStore = useFeatureStore()
</script>

<template>
  <div class="flow-dashboard">
    <SeparatorIcon />
    <div class="row cards">
      <div class="card">
        Features
        <span class="numeric">
          {{ featureStore.totalFeaturesDone
          }}<span class="sub">/{{ featureStore.totalFeaturesCount }} </span>
        </span>
      </div>
      <div class="card">
        Team work exp.
        <span class="numeric">
          {{ featureStore.meta.teamWorkExperience.toFixed(2) }}
        </span>
      </div>
      <div class="card">
        Mean complexity
        <div class="numeric">{{ featureStore.meanComplexity }}</div>
      </div>
      <div class="card">
        Mean lead time
        <div class="data">
          <span class="numeric">{{ featureStore.meanLeadTime }}</span>
          days
        </div>
      </div>
      <div class="card">
        Takt time
        <div class="data">
          <span class="numeric">{{ featureStore.taktTime }}</span>
          days
        </div>
      </div>
      <div class="card">
        Days
        <div class="data">
          <span class="numeric">{{ featureStore.meta.totalDays }}</span
          >d
        </div>
      </div>
      <div class="card">
        ETA
        <div class="data">
          <span class="numeric">{{ featureStore.eta }}</span>
          days
        </div>
      </div>
    </div>
    <FlowControls />
  </div>
</template>

<style scoped lang="scss">
.flow-dashboard {
  font-size: 13pt;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .card {
    background-image: linear-gradient(
      335deg,
      hsl(223deg 58% 88%) 0%,
      hsl(224deg 57% 88%) 21%,
      hsl(224deg 58% 89%) 30%,
      hsl(223deg 57% 89%) 39%,
      hsl(222deg 56% 89%) 46%,
      hsl(223deg 57% 90%) 54%,
      hsl(222deg 55% 90%) 61%,
      hsl(223deg 53% 91%) 69%,
      hsl(221deg 56% 91%) 79%,
      hsl(222deg 53% 92%) 100%
    );
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .numeric {
      flex: 1;
    }
  }
}
</style>
