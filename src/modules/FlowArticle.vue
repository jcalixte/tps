<script setup lang="ts">
import FlowHypothesis from '@/modules/article/FlowHypothesis.vue'
import FlowIntro from '@/modules/article/FlowIntro.vue'
import FeatureSteps from '@/modules/feature/FeatureSteps.vue'
import FlowDashboard from '@/modules/feature/FlowDashboard.vue'
import SimulationControls from '@/modules/simulation/SimulationControls.vue'
import SimulationDashboard from '@/modules/simulation/SimulationDashboard.vue'
</script>

<template>
  <div class="flow-article">
    <FlowIntro class="text" />
    <hr />
    <FlowHypothesis class="text" />
    <FeatureSteps alias="introducing" />
    <FlowDashboard />
    <FeatureSteps alias="playground" />
    <SimulationControls />
    <SimulationDashboard />
  </div>
</template>

<style lang="scss">
.flow-article {
  color: black;

  .text {
    font-size: 16pt;
    max-width: 800px;
    margin: auto;
    text-align: justify;
  }
}
</style>
