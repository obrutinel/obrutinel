<script setup lang="ts">
import { getUniverse } from '~/data/universes'

// Barre flottante du comparateur : apparaît dès qu'une annonce est cochée.
const { bikes, clear } = useCompare()
const route = useRoute()

const visible = computed(() => bikes.value.length > 0 && route.path !== '/comparer')
const universeName = computed(() => bikes.value[0] ? getUniverse(bikes.value[0].universe)?.name : '')
</script>

<template>
  <Transition name="compare-bar">
    <div v-if="visible" class="fixed inset-x-0 bottom-4 z-50 px-4">
      <div class="mx-auto flex max-w-2xl items-center gap-4 rounded-2xl border border-line bg-card py-3 pl-5 pr-3 shadow-(--shadow-lift-lg)">
        <p class="min-w-0 flex-1 text-sm">
          <span class="tnum font-semibold">{{ bikes.length }}</span>
          vélo{{ bikes.length > 1 ? 's' : '' }} {{ universeName }} à comparer
          <span class="text-ink-soft">(4 max, même univers)</span>
        </p>
        <button type="button" class="shrink-0 text-sm font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline" @click="clear">
          Vider
        </button>
        <NuxtLink
          to="/comparer"
          class="pressable shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold no-underline transition-colors duration-150"
          :class="bikes.length >= 2 ? 'bg-pine text-white hover:bg-pine-deep' : 'cursor-not-allowed bg-line text-ink-soft'"
          :tabindex="bikes.length >= 2 ? undefined : -1"
          @click="bikes.length < 2 && $event.preventDefault()"
        >
          Comparer
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .compare-bar-enter-active,
  .compare-bar-leave-active {
    transition: transform 220ms var(--ease-out-strong), opacity 220ms var(--ease-out-strong);
  }
  .compare-bar-enter-from,
  .compare-bar-leave-to {
    transform: translateY(16px);
    opacity: 0;
  }
}
</style>
