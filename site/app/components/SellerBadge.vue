<script setup lang="ts">
import type { SellerType } from '~/data/types'
import { sellerTypeLabels } from '~/data/sellers'

const props = defineProps<{ type: SellerType }>()

const classes: Record<SellerType, string> = {
  particulier: 'border border-ink/30 text-ink-soft',
  boutique: 'bg-ink text-card',
  loueur: 'bg-cartouche text-card',
}

const label = computed(() => sellerTypeLabels[props.type])
</script>

<template>
  <span class="roadsign-label inline-flex items-center rounded-xs px-1.5 py-0.5 text-[11px] leading-4" :class="classes[type]">
    {{ label }}
  </span>
</template>
