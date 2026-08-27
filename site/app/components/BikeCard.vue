<script setup lang="ts">
import type { Bike } from '~/data/types'
import { conditionLabels } from '~/data/bikes'
import { getSeller } from '~/data/sellers'
import { universeKind } from '~/data/universes'

const props = defineProps<{ bike: Bike }>()

const seller = computed(() => getSeller(props.bike.sellerSlug))
</script>

<template>
  <article class="group relative flex flex-col overflow-hidden rounded-md border border-line bg-card transition-shadow duration-200 hover:shadow-[0_10px_28px_-14px_rgba(23,20,14,0.35)]">
    <div class="relative border-b border-line px-6 pb-2 pt-4" :style="{ backgroundColor: `color-mix(in srgb, ${bike.color} 9%, var(--color-card))` }">
      <span v-if="bike.lot" class="roadsign-label absolute left-0 top-4 z-10 rounded-r-sm bg-cartouche px-2 py-1 text-[11px] text-card">
        Lot fin de saison
      </span>
      <div class="mx-auto aspect-8/5 max-w-72 transition-transform duration-200 ease-(--ease-out-strong) group-hover:-translate-y-0.5">
        <BikeIllustration :kind="universeKind(bike.universe)" :color="bike.color" />
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-2 p-4">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-display text-xl font-semibold leading-tight">
          <NuxtLink :to="`/annonce/${bike.slug}`" class="no-underline after:absolute after:inset-0 hover:underline">
            {{ bike.title }}
          </NuxtLink>
        </h3>
        <SellerBadge v-if="seller" :type="seller.type" class="mt-0.5 shrink-0" />
      </div>

      <p class="tnum text-sm text-ink-soft">
        {{ bike.year }} · {{ bike.size }} · {{ conditionLabels[bike.condition] }}<template v-if="bike.km"> · {{ bike.km.toLocaleString('fr-FR') }} km</template>
      </p>

      <div class="mt-auto flex items-end justify-between gap-3 pt-1">
        <PriceTag :price="bike.price" :original-price="bike.originalPrice" />
        <p class="text-sm text-ink-soft">{{ bike.city }} ({{ bike.dept }})</p>
      </div>
    </div>
  </article>
</template>
