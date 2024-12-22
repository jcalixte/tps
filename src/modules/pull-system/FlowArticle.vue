<script setup lang="ts">
import SeparatorIcon from '@/icons/SeparatorIcon.vue'
import FlowConclusion from '@/modules/pull-system/article/FlowConclusion.vue'
import FlowHypothesis from '@/modules/pull-system/article/FlowHypothesis.vue'
import FlowIntro from '@/modules/pull-system/article/FlowIntro.vue'
import FlowMultipleSimulation from '@/modules/pull-system/article/FlowMultipleSimulation.vue'
import FlowSetup from '@/modules/pull-system/article/FlowSetup.vue'
import FlowSingleSimulation from '@/modules/pull-system/article/FlowSingleSimulation.vue'
import FeatureSteps from '@/modules/pull-system/feature/FeatureSteps.vue'
import FlowDashboard from '@/modules/pull-system/feature/FlowDashboard.vue'
import SimulationControls from '@/modules/pull-system/simulation/SimulationControls.vue'
import SimulationDashboard from '@/modules/pull-system/simulation/SimulationDashboard.vue'
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
    <FlowDashboard class="above" />
    <FeatureSteps alias="playground" />
    <SimulationControls type="single" class="above" />
    <SimulationDashboard />
    <FlowSingleSimulation class="text" />
    <SimulationControls type="multiple" class="above" />
    <SimulationDashboard />
    <FlowMultipleSimulation class="text" />
    <SeparatorIcon />
    <FlowConclusion class="text" />
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
