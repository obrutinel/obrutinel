<script setup lang="ts">
import type { Bike } from '~/data/types'
import { conditionLabels } from '~/data/bikes'
import { getSeller } from '~/data/sellers'
import { universeKind } from '~/data/universes'

const props = defineProps<{ bike: Bike }>()

const seller = computed(() => getSeller(props.bike.sellerSlug))
</script>

<template>
  <article class="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-[box-shadow,translate] duration-200 ease-(--ease-out-strong) hover:-translate-y-0.5 hover:shadow-(--shadow-lift-lg)">
    <div class="relative px-5 pt-5" :style="{ backgroundColor: `color-mix(in srgb, ${bike.color} 5%, #f6f6f1)` }">
      <div class="absolute left-4 top-4 z-10 flex items-center gap-1.5">
        <span v-if="bike.lot" class="roadsign-label -rotate-2 rounded-full bg-flame px-2.5 py-1 text-[10.5px] leading-none text-white">
          Lot fin de saison
        </span>
      </div>
      <SellerBadge v-if="seller" :type="seller.type" class="absolute right-4 top-4 z-10" />
      <div class="mx-auto aspect-16/10 max-w-72 transition-transform duration-250 ease-(--ease-out-strong) group-hover:scale-[1.03]">
        <BikeIllustration :kind="universeKind(bike.universe)" :color="bike.color" />
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-1.5 p-5">
      <h3 class="text-[17px] font-semibold leading-snug">
        <NuxtLink :to="`/annonce/${bike.slug}`" class="no-underline after:absolute after:inset-0">
          {{ bike.title }}
        </NuxtLink>
      </h3>

      <p class="tnum text-sm text-ink-soft">
        {{ bike.year }} · {{ bike.size }} · {{ conditionLabels[bike.condition] }}<template v-if="bike.km"> · {{ bike.km.toLocaleString('fr-FR') }} km</template>
      </p>

      <div class="mt-auto flex items-end justify-between gap-3 pt-3">
        <PriceTag :price="bike.price" :original-price="bike.originalPrice" />
        <p class="pb-0.5 text-sm text-ink-soft">{{ bike.city }}</p>
      </div>
    </div>
  </article>
</template>
