<script setup lang="ts">
import SeparatorIcon from '@/icons/SeparatorIcon.vue'
import type { Feature } from '@/modules/pull-system/feature/feature'
import FeatureSteps from '@/modules/pull-system/feature/FeatureSteps.vue'
import FlowDashboard from '@/modules/pull-system/feature/FlowDashboard.vue'
import SimulationControls from '@/modules/pull-system/simulation/SimulationControls.vue'
import SimulationDashboard from '@/modules/pull-system/simulation/SimulationDashboard.vue'
// import ProblemSolvingIcon from '@/icons/ProblemSolvingIcon.vue'
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
import FeatureItem from '@/modules/pull-system/feature/FeatureItem.vue'
import QualityIssue from '@/modules/pull-system/feature/QualityIssue.vue'

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
  <article class="flow-article">
    <h1>Pull system</h1>
    <!-- <h2>Ekiden (駅伝): long-distance running relay race</h2> -->
    <div class="flow-intro text">
      <p>
        In lean manufacturing, one key aspect is the notion of
        <em>lead time</em>: the time needed by the company to deliver the
        product requested by the client starting when the client makes the
        order. For lean practitioners, the way to deliver at the right time is
        by improving how their delivery system works with... The pull system!
      </p>
      <p>
        The pull system is in opposition of the push system. Instead of trying
        to make everyone work at their maximum capacity, we try to improve the
        time it needs to deliver a feature.
      </p>
      <p>
        I wanted to create a simulation to see what are the consequences of
        different strategy patterns and which is the most effective.
      </p>
      <p>
        Let's see what happens when we want to create a Newsletter mobile app.
        We have some functionalities to implement and we want to measure how
        long it takes.
      </p>
      <p>
        <em
          >Note: as we'll visualize work done between teams, it needs space so
          this article has a better experience on desktop.</em
        >
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
        The project has just started, our goal is to make a product as fast as
        you can. You'll have teams dedicated to the product, the design, the
        coding and one making sure it is going live.
      </p>
      <p>
        First things first, what is a feature? A feature is a piece of software
        that enables <em>things</em> for the user. It can be the capability to
        read articles or to share them or even to be able to read one without
        the need for internet connection. In our simulation, a feature will be
        represented as follow:
      </p>
      <FeatureItem :feature="feature" />
      <p>
        It starts with the intention "<code>{{ feature.name }}</code
        >". This is what we'll add to the mobile app.
      </p>
      <!-- [complexity]
      <p>
        <span class="numeric">({{ feature.complexity }})</span> is the
        complexity of the feature. The more complex a feature is, the more
        chance we introduce a defect.
      </p> -->
      <p>
        <span class="numeric">{{ feature.leadTime }}d</span> is the number of
        days the teams work on the feature. The goal is to reduce this number
        and deliver as fast as possible.
      </p>
      <p>
        <QualityIssue class="inline" :quality-issue="feature.qualityIssue" />
        are the number of defects the feature has during the flow. For the sake
        of simplicity, we assume teams are capable of detecting every defects
        and we never deliver defects.
      </p>
      <p>
        Okay! We have 20 features to deliver. It takes one day for each team to
        finish their part for each feature.
      </p>
      <!-- [dps] <p>Each day, you can choose between 3 strategies:</p> -->
      <p>Each day, you can choose between 2 strategies:</p>
      <ol>
        <li><PushSystemIcon /> Push system</li>
        <li><PullSystemIcon /> Pull system</li>
        <!-- [dps]
      <li>
        <ProblemSolvingIcon /> Problem solving
      </li> -->
      </ol>
      <p>
        In this article we'll focus on how these strategies are efficient and
        what are the impact on the quality the teams produce. Let's dive in each
        strategy!
      </p>
      <h3>The push system: start as many features as possible</h3>
      <p>
        By pushing features from the start, we try to maximize the time worked
        by teams on the product. This way, no money is wasted, everyone has
        everytime something to do.
      </p>
      <p>
        But it comes with a cost: the more feature ongoing in parallel, the more
        it is difficult to focus and it is more likely to introduce a defect..
      </p>
      <h3>
        The pull system: produce features only when the next team needs it
      </h3>
      <p>
        Now, instead of pushing features, we wait for the next team to be ready.
        It comes from the assumptions that we will never reach the best score
        ever aka "the push system where everything goes right". We know we
        prefer waiting for next team to be ready before doing some extra work
        than having stock of feature pre-baked.
      </p>
      <p>
        To make this happen we first need to setup blue bins: our security
        stocks. Blue bins make sure teams can work without any blockers. The
        next team will always have material to transform. Here, we'll have 2
        blue bins per team, it seems a good tradeoff.
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
    <FlowDashboard class="above" />
    <FeatureSteps alias="playground" />
    <div class="manual-simulation text">
      <!-- TODO: Mettre ici le comportement en pull system et en push system.
     En push system, on voit un goulot d'étranglement.
     En pull system, on voit petit à petit du danse avec une passation de plus en plus facile.
     Il n'empêche que dans les deux systèmes il y ai de la création de défaut -->
      <p>
        So what do you think? Not so obvious... So what can we learn? What are
        the patterns we can identify?
      </p>
      <p>
        In a primarly <PushSystemIcon /> push system, we see teams struggling
        and stuck reworking the same features again and again to finally having
        all features live all at once.
      </p>
      <p>
        In a primarly <PullSystemIcon /> pull system however, we see a smoother
        flow of work with teams able to pass on features more easily and
        continuously, leading to a more steady and predictable delivery. It's
        not perfect, defects are still there. But when we start to see
        synchronisation, we can see a better quality too.
      </p>
      <p>
        Here are two buttons to simulate the same project with only one strategy
        involved so we can compare.
      </p>
    </div>
    <SimulationControls type="single" class="above" />
    <SimulationDashboard />
    <div class="text">
      <p>
        Pull systems seem better. But before any conclusion, comparing two
        simulations is not enough. Let's generate 200 projects delivering the 20
        features of the Newsletter app and see what happens.
      </p>
    </div>
    <SimulationControls type="multiple" class="above" />
    <SimulationDashboard />
    <div class="flow-multiple-simulation text">
      <p>
        Okay, now we're pretty sure! The takt time is quite close actually. But
        as the quality issue increase in the push system, these defects and
        corrections pile up and generate at about 15 days of difference. For a
        long time, I wanted a proof
        <em>to trust the process</em>, that's the beauty of simulations. It's
        quite impossible to convince people when we're in the middle of the
        battle. If teams change every time, you are doomed to get this problem
        over and over again.
      </p>
      <p>
        Teams tend to underestimate how long a project will be. And how hard it
        will be to work with others.
      </p>
      <!-- [dps]
      <p>
        Note that problem solving is always a good practice. The capacity of the
        team to stop and think about how they work is critical.
      </p> -->
      <p>
        If we're not in a good pace, we just have to try harder. Only once.
        "Just in time" becomes "Just this time" many times. So teams
        overproduce. Creating stock and latent defects the teams need to rework.
        The worse the project do, the more silot we become and we tend to argue
        with a "I've done my job, if the project fails it's not my fault.". The
        fact is that it's nobody's fault, it's a system.
      </p>
      <p>
        Short term objectives become the norm. It is never the right time to do
        problem solving. To think on how we work.
      </p>
      <p>
        Pull system must be a constrain not a choice with the idea to build
        around.
      </p>
    </div>
    <SeparatorIcon />
    <div class="flow-conclusion text">
      <p>
        The fact that
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://journals.aps.org/pre/abstract/10.1103/PhysRevE.96.052303#:~:text=The%20%E2%80%9Cfaster%2Dis%2Dslower,evacuation%20time%20can%20be%20achieved"
          >slower is faster</a
        >
        is counter-intuitive. The more we push the more we are slowing down the
        system.
      </p>
      <p>
        When money and pressure are in the game, fear, uncertainty, and doubt
        spread out rapidly. So we rush, as fast as we can, and when a team has
        nothing to do, it becomes a disaster: money are being burned.
      </p>
      <p>
        Teams will overproduce. They will do every pieces they can as they can:
        product team will prepare their features, designers will design every
        screens, developers will rush to code. Then, they struggle to get these
        pieces to the very end. So the fear of having nothing to give to the
        next team pushes us to produce just in case. Bugs lead to more bugs that
        lead to more bugs. The productivity drops.
      </p>
      <p>
        So the <PullSystemIcon /> pull system is here to change our priority.
        Developpers are the clients of the Designer team, as well as Designers
        are the client of the Product team. Focusing on the lead time is asking
        to the next team: "Is this what you need? How can we help each other?".
        This is the question of team work.
      </p>
    </div>
  </article>
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
}
</style>
