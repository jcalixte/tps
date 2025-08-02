<script setup lang="ts">
const createdAt = new Date('2025-01-08').toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <article id="main-app">
    <h1>5S</h1>
    <h2 class="created-at numeric">
      {{ createdAt }}
    </h2>
    <div class="text">
      <p>
        Vous venez d'emmenager dans un nouveau quartier. Une de vos activités
        préférées dans votre ancienne vie était de flaner dans un café. Alors
        vous vous mettez à la recherche d'un café sympa.
      </p>
      <p>
        Il se trouve que vous en trouvez un tout à fait charmant. Voici le
        propriétaire qui vous accueille chaleureusement. Vous prenez votre café
        et vous vous installez près de la fenêtre prêt pour une bonne lecture.
        Tout ici y est charmant, et plus les journées passent, plus vous
        discutez avec le propriétaire vous partage ses secrets. Jusqu'au jour où
        il vous propose de l'aider à tenir ce café.
      </p>
      <p>
        Super ! Comment faire ? "This, my friend," he says calmly, "is what
        makes the whole shop work. Everything I know, everything I need is
        written down on this piece of paper. Please, take care of it."
      </p>
      <p>
        As you look down at the paper, you see a bunch of lists, todos, and
        notes in a brown used paper. It looks like it has lived more than you.
      </p>
    </div>
  </article>
</template>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 2 * 1rem);
}
</style>
