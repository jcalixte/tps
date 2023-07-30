<script setup lang="ts">
import SeparatorIcon from '@/icons/SeparatorIcon.vue'
import FlowHypothesis from '@/modules/article/FlowHypothesis.vue'
import FlowIntro from '@/modules/article/FlowIntro.vue'
import FlowSetup from '@/modules/article/FlowSetup.vue'
import FeatureSteps from '@/modules/feature/FeatureSteps.vue'
import FlowDashboard from '@/modules/feature/FlowDashboard.vue'
import SimulationControls from '@/modules/simulation/SimulationControls.vue'
import SimulationDashboard from '@/modules/simulation/SimulationDashboard.vue'
</script>

<template>
  <div class="flow-article">
    <h1>Pull system</h1>
    <h2>Ekiden (駅伝): long-distance running relay race</h2>
    <FlowIntro class="text" />
    <SeparatorIcon />
    <FlowHypothesis class="text" />
    <SeparatorIcon />
    <FlowSetup class="text" />
    <FeatureSteps alias="introducing" />
    <FlowDashboard class="above" />
    <FeatureSteps alias="playground" />
    <SimulationControls class="above" />
    <SimulationDashboard />
  </div>
</template>

<style lang="scss">
.flow-article {
  color: black;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1080px;
  margin: auto;

  .text {
    font-size: 16pt;
    max-width: 650px;
    margin: auto;
    text-align: justify;
  }

  .above {
    z-index: 1;
    padding-top: 1rem;
    background-color: white;
  }
}
</style>
