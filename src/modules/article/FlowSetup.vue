<script setup lang="ts">
import ProblemSolvingIcon from '@/icons/ProblemSolvingIcon.vue'
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
import FlowControls from '@/modules/feature/FlowControls.vue'
</script>

<template>
  <div>
    <p>
      You're a Product Manager in a project who has just started, your goal is
      to make a product as fast as you can. With you, you'll have the product
      team, designers, developers and a release team.
    </p>
    <p>Each day, you can choose between 3 strategies:</p>
    <ol>
      <li>
        Push system
        <PushSystemIcon />
      </li>
      <li>
        Pull system
        <PullSystemIcon />
      </li>
      <li>
        Problem solving
        <ProblemSolvingIcon />
      </li>
    </ol>
    <p>
      In this article we'll focus on how these strategies are efficient and what
      are the impact on the quality the teams produce.
    </p>
    <FlowControls />
  </div>
</template>
