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
  <p class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
    <span class="tnum headline" :class="size === 'lg' ? 'text-4xl' : 'text-[22px]'">
      {{ formatPrice(price) }}
    </span>
    <template v-if="pct">
      <s class="tnum text-sm text-ink-soft">{{ formatPrice(originalPrice!) }}</s>
      <span class="tnum rounded-full bg-flame/10 px-2 py-0.5 text-xs font-bold text-flame-deep">−{{ pct }}&nbsp;%</span>
    </template>
  </p>
</template>
