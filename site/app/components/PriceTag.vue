<script setup lang="ts">
import { discountPct, formatPrice } from '~/utils/site'

const props = withDefaults(defineProps<{
  price: number
  originalPrice?: number
  size?: 'md' | 'lg'
}>(), { size: 'md' })

const pct = computed(() => discountPct(props.price, props.originalPrice))
</script>

<template>
  <p class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
    <span class="tnum font-display font-bold" :class="size === 'lg' ? 'text-4xl' : 'text-2xl'">
      {{ formatPrice(price) }}
    </span>
    <template v-if="pct">
      <s class="tnum text-sm text-ink-soft">{{ formatPrice(originalPrice!) }}</s>
      <span class="tnum roadsign-label rounded-xs bg-borne px-1.5 py-0.5 text-[11px] text-ink">−{{ pct }}&nbsp;%</span>
    </template>
  </p>
</template>
