<script setup lang="ts">
import ProblemSolvingIcon from '@/icons/ProblemSolvingIcon.vue'
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
import FeatureItem from '@/modules/pull-system/feature/FeatureItem.vue'
import FlowControls from '@/modules/pull-system/feature/FlowControls.vue'
import QualityIssue from '@/modules/pull-system/feature/QualityIssue.vue'
import { Feature } from '@/modules/pull-system/feature/feature'

const feature: Feature = {
  name: 'As a user I can have access to the latest news from the homepage.',
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
      The project who has just started, our goal is to make a product as fast as
      you can. With you, you'll have the product team, designers, developers and
      a release team.
    </p>
    <p>
      First things first, what is a feature? A feature is a piece of software
      that enables <em>things</em> for the user. It can be the capability to
      read articles or to share them or even to be able to read one without the
      need for internet connection. In our simulation, a feature will be
      represented as follow:
    </p>
    <FeatureItem :feature="feature" />
    <p>
      It starts with the intention "<code>{{ feature.name }}</code>". This is what we'll add to the mobile app.
    </p>
    <p>
      <span class="numeric">({{ feature.complexity }})</span> is the complexity
      of the feature. The more complex a feature is, the more chance we introduce a defect.
    </p>
    <p>
      <span class="numeric">{{ feature.leadTime }}d</span> is the number of days
      the teams work on the feature. The goal is to reduce this number and
      deliver as fast as possible.
    </p>
    <p>
      <QualityIssue class="inline" :quality-issue="feature.qualityIssue" />
      are the number of defects the feature had during the flow. For the sake of
      simplicity, we assume teams are capable of detecting every defects and we
      never deliver defects.
    </p>
    <p>
      Okay! We have 20 features to deliver. It takes one day for each team to finish
      their part for each feature.
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
      are the impact on the quality the teams produce. Let's dive in each
      strategy!
    </p>
    <h3>The push system: start as many features as possible</h3>
    <p>
      By pushing features from the start, we try to maximize the time worked by teams on the product.
      This way, no money is wasted, everyone has everytime something to do.
    </p>
    <h3>The pull system: produce features only when the next team needs it</h3>
    <p>
      It comes from the assumptions that we will never reach the best score ever
      aka "the push system where everything goes right". We know we prefer
      waiting for next team to be ready before doing some extra work than having
      stock of feature pre-baked.
    </p>
    <p>
      To make this happen we first need to setup blue bins: our security stocks
      Blue bins make sure teams can work without any blockers. The next team
      will always have material to transform. Here, we'll have 2 blue bins per
      team.
    </p>
    <h3>Problem solving: no production, just reflection</h3>
    <p>
      We invest days where we are not productive at all to investigate and
      learning from our mistake. We know that we will never reach the best score
      ever and we know that mistakes will reappear. So we take more time to
      understand and limit rework. The more the team investigate, the more the
      team learn and start to be extremely good at problem solving.
    </p>
  </div>
</template>

<style scoped>
.inline {
  display: inline;
}
</style>
