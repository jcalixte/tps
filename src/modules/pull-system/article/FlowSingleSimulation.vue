<script setup lang="ts">
import PullSystemIcon from '@/icons/PullSystemIcon.vue'
import PushSystemIcon from '@/icons/PushSystemIcon.vue'
</script>

<template>
  <div class="flow-conclusion">
    <!-- TODO: Mettre ici le comportement en pull system et en push system.
     En push system, on voit un goulot d'étranglement.
     En pull system, on voit petit à petit du danse avec une passation de plus en plus facile.
     Il n'empêche que dans les deux systèmes il y ai de la création de défaut -->
    <p>
      Not so obvious... So what can we learn? What are the patterns we can
      identify?
    </p>
    <p>
      In a primarly <PushSystemIcon /> push system, we see teams struggling and
      stuck reworking the same features again and again to finally having all
      features live all at once.
    </p>
    <p>
      In a primarly <PullSystemIcon /> pull system however, we see a smoother
      flow of work with teams able to pass on features more easily and
      continuously, leading to a more steady and predictable delivery. It's not
      perfect, but you may have see a balai of features when teams work and
      finish at the same time. 💃🏽
      <!-- TODO complete this sentence -->
    </p>
    <p>
      Before any conclusion, comparing two simulations is not enough. Let's be
      more scientific here and let's generate 200 projects delivering the 20
      features of the Newsletter app and see what happens.
    </p>
  </div>
</template>
