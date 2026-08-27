<script setup lang="ts">
import type { SellerType } from '~/data/types'
import { sellerTypeLabels } from '~/data/sellers'

const props = defineProps<{ type: SellerType }>()

const classes: Record<SellerType, string> = {
  particulier: 'border border-line bg-paper text-ink-soft',
  boutique: 'bg-ink text-card',
  loueur: 'bg-flame text-white',
}

const label = computed(() => sellerTypeLabels[props.type])
</script>

<template>
  <span class="roadsign-label inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] leading-none" :class="classes[type]">
    {{ label }}
  </span>
</template>
