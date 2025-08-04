<script setup lang="ts">
import SeparatorIcon from '@/icons/SeparatorIcon.vue'
import type { Feature } from '@/modules/pull-system/feature/feature'
import FeatureSteps from '@/modules/pull-system/feature/FeatureSteps.vue'
import FlowDashboard from '@/modules/pull-system/feature/FlowDashboard.vue'
import SimulationControls from '@/modules/pull-system/simulation/SimulationControls.vue'
import SimulationDashboard from '@/modules/pull-system/simulation/SimulationDashboard.vue'
// [dps] import ProblemSolvingIcon from '@/icons/ProblemSolvingIcon.vue'
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
import FeatureItem from '@/modules/pull-system/feature/FeatureItem.vue'
import QualityIssue from '@/modules/pull-system/feature/QualityIssue.vue'
import { useSimulationStore } from '@/modules/pull-system/simulation/simulation-store'
import { computed } from 'vue'

const feature: Feature = {
  name: 'As a user I can have access to the latest news from the homepage.',
  complexity: 3,
  leadTime: 2,
  qualityIssue: 4,
  status: 'doing',
  step: 2
}

const simulationStore = useSimulationStore()
const meanLeadTimeDeltaFloat = computed(
  () =>
    parseFloat(simulationStore.meanLeadTime('push')) -
    parseFloat(simulationStore.meanLeadTime('pull'))
)
const meanLeadTimeDelta = computed(() =>
  meanLeadTimeDeltaFloat.value.toFixed(2)
)

const SIMULATION_THRESHOLD = 20

const displaySimulationConclusion = computed(() => {
  return simulationStore.simulationsDone > SIMULATION_THRESHOLD
})

const createdAt = new Date('2025-01-08').toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <article class="flow-article with-article">
    <h1>Pull System</h1>
    <h2 class="created-at numeric">
      {{ createdAt }}
    </h2>
    <div class="flow-intro text">
      <p>
        In lean manufacturing, a key concept is <em>lead time</em>: the time it
        takes for a company to deliver a product from the moment a client places
        an order. For lean practitioners, ensuring timely delivery involves
        optimizing their delivery system using... the pull system!
      </p>
      <p>
        In a pull system, instead of trying to make everyone work at maximum
        capacity, the focus shifts to improving the time required to deliver one
        product.
      </p>
      <p>
        But few people will bet the success of their product on a system they
        are not familiar with. This is where simulation helps. We can safely
        explore the consequences of different strategic approaches and identify
        which one is really most effective.
      </p>
      <p>
        We'll simulate the creation of a mobile news app with several
        functionalities to implement and want to measure how long each takes to
        complete. Ready? Let's dive in!
      </p>
    </div>
    <SeparatorIcon />
    <div class="text">
      <p>
        <em>
          Note: This article includes visualizations of team workflows that can
          be too large for a mobile phone. For the best experience, please view
          it on a desktop.
        </em>
      </p>
    </div>
    <SeparatorIcon />
    <!-- <div class="flow-hypothesis">
      We need some hypothesis to start with. Here are ours:
      <ol>
        <li>
        </li>
        <li>
          it takes the same amount of time for each team to complete a task.
        </li>
      </ol>
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
    </div> -->
    <!-- <SeparatorIcon /> -->
    <div class="flow-setup text">
      <p>
        The project has just begun, and our goal is to deliver a product as
        quickly as possible. We’ll have dedicated teams for product design,
        coding, and ensuring the product goes live.
      </p>
      <p>
        First, let's take a moment to define the most important element: the
        feature. A feature is a software component that provides a functionality
        for the user like the ability to read articles, share content, or use
        the app offline. In our simulation, a feature is represented as follows:
      </p>
      <FeatureItem :feature="feature" />
      <p>
        Each feature starts with an intention: "<code>{{ feature.name }}</code
        >". "<span class="numeric">{{ feature.leadTime }}d</span>" indicates the
        number of days teams work on the feature. The goal is to minimize this
        number and deliver features as quickly as possible. "<QualityIssue
          class="inline"
          :quality-issue="feature.qualityIssue"
        />" shows the number of defects found in the feature during its workflow
        <em
          >(For simplicity, we assume teams can identify all defects, and no
          defective features are delivered)</em
        >. Any defect must be reworked by the team that caused it.
      </p>
      <p>It takes one day to each team to complete their part.</p>
      <!-- [complexity]
      <p>
        <span class="numeric">({{ feature.complexity }})</span> is the
        complexity of the feature. The more complex a feature is, the more
        chance we introduce a defect.
      </p> -->
      <!-- [dps] <p>Each day, you can choose between 3 strategies:</p> -->
      <p>
        Okay! We have 20 features to deliver and every day, you can choose
        between two strategies:
      </p>
      <h3>
        1. <PushSystemIcon /> The Push System: Start as Many Features as
        Possible
      </h3>
      <p>
        In the push system, we aim to maximize the time teams spend working on
        the product. This ensures no downtime, as everyone always has tasks to
        complete.
      </p>
      <h3>
        2. <PullSystemIcon /> The Pull System: Produce Features When the Next
        Team Needs Them
      </h3>
      <p>
        Instead of pushing features forward, the pull system waits until the
        next team is ready. This approach acknowledges that the ideal "push
        system where everything goes perfectly" is unrealistic. By prioritizing
        readiness, we avoid creating a backlog of pre-prepared features.
      </p>
      <p>
        We introduce "blue bins" as safety stocks: these bins ensure teams
        always have work ready to process without delays
        <em><strong>but</strong></em> teams stop whenever blue bins are full.
      </p>
      <!-- [dps]
     <h3>Problem solving: no production, just reflection</h3>
    <p>
      We invest days where we are not productive at all to investigate and
      learning from our mistake. We know that we will never reach the best score
      ever and we know that mistakes will reappear. So we take more time to
      understand and limit rework. The more the team investigate, the more the
      team learn and start to be extremely good at problem solving.
    </p> -->
    </div>
    <div class="text">
      <p>All set? Let's make this app!</p>
    </div>
    <FlowDashboard class="above" />
    <FeatureSteps alias="playground" />
    <div class="manual-simulation text">
      <p>
        Well, what do you think? Not so obvious... What can we say? Here are
        some observations:
      </p>
      <ol>
        <li>
          In a predominantly <PushSystemIcon /> push system, teams perform well
          initially, but issues can snowball when problems arise. Teams
          struggle, leading to repeated rework, and many features are delivered
          all at once.
        </li>
        <li>
          A <PullSystemIcon /> pull system creates a smoother workflow, with
          teams passing features along continuously. This results in steadier
          and more predictable delivery. Although defects still occur, the
          synchronized workflow improves quality. Features are delivered in
          smaller batches, which benefits users.
        </li>
      </ol>
      <p>
        Let’s compare the two systems by simulating the entire project using
        either the <PushSystemIcon /> push system or the <PullSystemIcon /> pull
        system.
      </p>
    </div>
    <SimulationControls type="single" />
    <SimulationDashboard />
    <div class="text">
      <p>
        Okay, we generally see that the <PullSystemIcon /> pull system is a bit
        quicker, features are delivered sooner. The real difference seems to be
        on the number of issues. In a <PullSystemIcon /> pull system, teams are
        focus on a small number of feature helping them having less overburden.
      </p>
      <p>
        Do you mind comparing more projects? What happens when we simulate 1000
        news mobile apps! Are patterns the same?
      </p>
    </div>
    <SimulationControls type="multiple" />
    <div class="flow-multiple-simulation text">
      <p v-if="displaySimulationConclusion">
        Now we’re pretty confident! As quality issues increase in the
        <PushSystemIcon /> push system, defects and corrections accumulate,
        leading to <span class="numeric">{{ meanLeadTimeDelta }}</span> days of
        delay<template v-if="meanLeadTimeDeltaFloat > 12">!!</template
        ><template v-else>.</template>
      </p>
      <p v-else class="waiting-simulations">
        Waiting for at least {{ SIMULATION_THRESHOLD }} simulations...
      </p>
      <!-- [dps]
      <p>
        Note that problem solving is always a good practice. The capacity of the
        team to stop and think about how they work is critical.
      </p> -->
      <p>
        Teams often underestimate the complexity of a project and the challenges
        of collaborating with others. Unfortunately, this is something I’ve
        observed in many software projects. If a software isn’t progressing
        well, the response is often to "try harder"—just once. However, "Just in
        time" frequently turns into try harder "Just this time" over and over.
        This approach causes teams to overproduce, creating unnecessary stock
        and latent defects that require rework. The more the project struggles,
        the more siloed teams become, leading to blame-shifting: "I did my part;
        if the project fails, it’s not my fault." The reality is, it’s not
        anyone’s fault—it’s the system that’s broken.
      </p>
      <!-- [dps]
      <p>
        Short term objectives become the norm. It is never the right time to do
        problem solving. To think on how we work.
      </p> -->
    </div>
    <SeparatorIcon />
    <div class="flow-conclusion text">
      <p>
        When under pressure to meet deadlines, fear and uncertainty can cause
        teams to overproduce. Product teams prepare extra features, designers
        create unnecessary screens, and developers rush through coding. This
        "just in case" mindset results in wasted effort and latent defects that
        require rework, slowing productivity. Worse, as there is always work to
        do, we can just throw bad parts and move on a new piece from stock,
        increasing bad quality.
      </p>
      <p>
        Counterintuitively,
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://journals.aps.org/pre/abstract/10.1103/PhysRevE.96.052303#:~:text=The%20%E2%80%9Cfaster%2Dis%2Dslower,evacuation%20time%20can%20be%20achieved"
          >slower is often faster</a
        >. Excessive <PushSystemIcon /> pushing slows down the system, while a
        <PullSystemIcon /> pull system enforces constraints that prioritize
        thoughtful delivery.
      </p>
      <p>
        The pull system shifts priorities, treating developers as clients of the
        design team, who in turn are clients of the product team. By focusing on
        lead time, teams ask, "What do you need to succeed, and how can we
        support you in delivering quality?" This embodies
        <em>the true essence</em> of teamwork.
      </p>
    </div>
  </article>
</template>

<style lang="scss">
.flow-article {
  .above {
    z-index: 1;
    padding-top: 1rem;
    background-color: white;
  }

  .flow-hypothesis {
    ol {
      li {
        text-align: left;
      }
    }
  }

  .inline {
    display: inline;
  }

  .waiting-simulations {
    font-style: italic;
  }
}
</style>
