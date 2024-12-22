<script setup lang="ts">
import ProblemSolvingIcon from '@/icons/ProblemSolvingIcon.vue'
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
import FeatureItem from '@/modules/pull-system/feature/FeatureItem.vue'
import FlowControls from '@/modules/pull-system/feature/FlowControls.vue'
import QualityIssue from '@/modules/pull-system/feature/QualityIssue.vue'
import { Feature } from '@/modules/pull-system/feature/feature'

const feature: Feature = {
  name: 'As a user, in the homepage, I can login',
  complexity: 3,
  leadTime: 2,
  qualityIssue: 4,
  status: 'doing',
  step: 2
}
</script>

<template>
  <div>
    <p>
      You're a Product Manager in a project who has just started, your goal is
      to make a product as fast as you can. With you, you'll have the product
      team, designers, developers and a release team.
    </p>
    <p>This is a feature:</p>
    <FeatureItem :feature="feature" />
    <p>
      <span class="numeric">({{ feature.complexity }})</span> is the complexity
      of the feature. The more complex a feature is, the more chance to have
      defect we have.
    </p>
    <p>
      <span class="numeric">{{ feature.leadTime }}d</span> is the number of days
      the feature started its journey. The ultimate goal is to reduce this
      number and deliver as fast as possible.
    </p>
    <p>
      <QualityIssue class="inline" :quality-issue="feature.qualityIssue" />
      are the number of defects the feature had during the flow.
    </p>
    <p>
      You have 20 features to deliver, and each day you can choose between 3
      strategies:
    </p>
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
    <FlowControls :with-eraser="false" />
    <p>
      In this article we'll focus on how these strategies are efficient and what
      are the impact on the quality the teams produce.
    </p>
    <h3>The push system: start features as many as possible</h3>
    <h4>Seeking for the most of each team</h4>
    <p>
      Pushing all the feature as fast as possible, this is the only strategy
      that allows us to target the best possible result: `# step × # status × #
      features`. We may overburden teams in the process though. But as we
      already invest money everybody to work so if there is someone who has
      nothing to do, this is just money down the drain.
    </p>
    <h3>The pull system: produce features only when the next team needs it</h3>
    <p>
      It comes from the assumptions that we will never reach the best score ever
      aka "the push system where everything goes right". We know we prefer
      waiting for next team to be ready before doing some extra work than having
      stock of feature pre-baked.
    </p>
    <h3>Problem solving: no production, just reflection</h3>
    <p>
      We invest days where we are not productive at all to investigate and
      learning from our mistake. We know that we will never reach the best score
      ever and we know that mistakes will reappear. So we take more time to
      understand and limit rework. The more the team investigate, the more the
      team learn and start to be extremely good at problem solving.
    </p>
    <h3>Blue bin: the security stock</h3>
    <p>
      Blue bins are your security stock, they make sure teams can work without
      any blockers. The next team will always have material to transform. But it
      comes with a cost: too many blue bins add overburden, stagnation
      (increasing lead time) and duplicated mistakes. The less you have, the
      more the team can focus. But the more you have, the more secure you are to
      make teams work, we have to find the good balance.
    </p>
  </div>
</template>

<style scoped>
.inline {
  display: inline;
}
</style>
