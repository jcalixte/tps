<script setup lang="ts"></script>

<template>
  <div class="flow-hypothesis">
    <p>Hypothesis:</p>
    <ol>
      <li>it takes the same amount of time for each team to complete a task</li>
      <li>
        teams know exactly what they need to produce their part, they will tag
        any defects they found when verifying the feature is good.
      </li>
      <li>the team where the defect appears must rework the feature.</li>
      <li>release team never fails</li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
ol {
  li {
    text-align: left;
  }
}
</style>
