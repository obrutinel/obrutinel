<script setup lang="ts">
import type { Universe } from '~/data/types'
import { bikesByUniverse } from '~/data/bikes'
import { mixHex } from '~/utils/site'

// Vignette d'univers du rail : bloc de couleur franc, vélo en duotone.
const props = defineProps<{ universe: Universe }>()

const count = computed(() => bikesByUniverse(props.universe.slug).length)
const bikeBody = computed(() => mixHex(props.universe.hue, '#ffffff', 0.78))
const bikeInk = computed(() => mixHex(props.universe.hue, '#000000', 0.48))

// Teintes claires (ambre…) : texte encre plutôt que blanc.
const isLight = computed(() => {
  const [r, g, b] = [1, 3, 5].map(i => Number.parseInt(props.universe.hue.slice(i, i + 2), 16))
  return (0.2126 * r! + 0.7152 * g! + 0.0722 * b!) / 255 > 0.55
})
</script>

<template>
  <article
    class="group relative flex w-52 shrink-0 snap-start flex-col overflow-hidden rounded-2xl transition-[box-shadow,translate] duration-200 ease-(--ease-out-strong) hover:-translate-y-1 hover:shadow-(--shadow-lift-lg) sm:w-60"
    :style="{ backgroundColor: universe.hue }"
  >
    <!-- Le vélo déborde du cadre : cadrage d'affiche, la roue avant est coupée -->
    <div class="pt-5">
      <div class="ml-[6%] aspect-16/10 w-[126%] transition-transform duration-250 ease-(--ease-out-strong) group-hover:-translate-x-2">
        <BikeIllustration :kind="universe.kind" :color="bikeBody" :ink="bikeInk" />
      </div>
    </div>
    <div class="flex items-end justify-between gap-2 p-4 pt-1" :class="isLight ? 'text-ink' : 'text-white'">
      <div>
        <h3 class="headline text-2xl">
          <NuxtLink :to="`/velos/${universe.slug}`" class="no-underline after:absolute after:inset-0" :class="isLight ? 'text-ink' : 'text-white'">
            {{ universe.name }}
          </NuxtLink>
        </h3>
        <p class="tnum mt-0.5 text-xs opacity-75">{{ count }} annonce{{ count > 1 ? 's' : '' }}</p>
      </div>
      <span class="pb-1 text-xl opacity-80 transition-transform duration-200 ease-(--ease-out-strong) group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">→</span>
    </div>
  </article>
</template>
