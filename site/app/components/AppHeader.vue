<script setup lang="ts">
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => {
  open.value = false
})

const links = [
  { to: '/#univers', label: 'Les univers' },
  { to: '/comment-ca-marche', label: 'Comment ça marche' },
  { to: '/pro', label: 'Pros & loueurs' },
]
</script>

<template>
  <header class="sticky top-0 z-40 bg-ink text-card">
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6" aria-label="Navigation principale">
      <NuxtLink to="/" class="flex items-center gap-2.5 no-underline" aria-label="Recyclette, accueil">
        <BrandMark :size="30" />
        <span class="font-display text-2xl font-bold uppercase tracking-wide">Recyclette</span>
      </NuxtLink>

      <div class="hidden items-center gap-7 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium text-card/85 no-underline transition-colors duration-150 hover:text-borne"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/vendre"
          class="pressable roadsign-label rounded-sm bg-borne px-4 py-2 text-sm text-ink no-underline transition-colors duration-150 hover:bg-borne-deep"
        >
          Déposer une annonce
        </NuxtLink>
      </div>

      <button
        type="button"
        class="pressable -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
        :aria-expanded="open"
        aria-controls="menu-mobile"
        @click="open = !open"
      >
        <span class="sr-only">{{ open ? 'Fermer le menu' : 'Ouvrir le menu' }}</span>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <template v-if="!open">
            <path d="M2 5.5h18M2 11h18M2 16.5h18" />
          </template>
          <template v-else>
            <path d="M4 4l14 14M18 4L4 18" />
          </template>
        </svg>
      </button>
    </nav>

    <!-- Marquage axial : la ligne jaune discontinue de la chaussée. -->
    <div class="h-[3px] w-full" style="background: repeating-linear-gradient(90deg, var(--color-borne) 0 26px, transparent 26px 44px)" aria-hidden="true" />

    <div v-if="open" id="menu-mobile" class="border-t border-card/10 px-4 pb-5 pt-2 md:hidden">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block py-3 text-base font-medium text-card/90 no-underline"
      >
        {{ link.label }}
      </NuxtLink>
      <NuxtLink
        to="/vendre"
        class="roadsign-label mt-2 block rounded-sm bg-borne px-4 py-3 text-center text-sm text-ink no-underline"
      >
        Déposer une annonce
      </NuxtLink>
    </div>
  </header>
</template>
