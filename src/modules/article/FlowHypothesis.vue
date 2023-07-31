<script setup lang="ts"></script>

<template>
  <div class="flow-hypothesis">
    <p>Here our hypothesis:</p>
    <ol>
      <li>
        it takes the same amount of time for each team to complete a task
        <span class="meaning">same task time</span>
      </li>
      <li>teams have no other external dependencies</li>
      <li>
        teams know exactly what they need to produce their part, they will tag
        any defects they found when verifying the feature is good.
      </li>
      <li>
        0 defect policy: the team where the defect appears must rework the
        feature.
      </li>
      <li>release team never fails</li>
      <li>there is no limit on how many defects a feature can have.</li>
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
