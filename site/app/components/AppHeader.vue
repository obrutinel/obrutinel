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
  <header class="sticky top-0 z-40 border-b border-line bg-card/95 backdrop-blur-sm">
    <nav class="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6" aria-label="Navigation principale">
      <NuxtLink to="/" class="flex items-center gap-2.5 no-underline" aria-label="Recyclette, accueil">
        <BrandMark :size="30" />
        <span class="headline text-[22px]">recyclette</span>
      </NuxtLink>

      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-[15px] font-medium text-ink-soft no-underline transition-colors duration-150 hover:text-ink"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/vendre"
          class="pressable rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-card no-underline transition-colors duration-150 hover:bg-flame"
        >
          Vendre mon vélo
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

    <div v-if="open" id="menu-mobile" class="border-t border-line px-4 pb-5 pt-2 md:hidden">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block py-3 text-base font-medium text-ink no-underline"
      >
        {{ link.label }}
      </NuxtLink>
      <NuxtLink
        to="/vendre"
        class="mt-2 block rounded-full bg-ink px-5 py-3 text-center text-[15px] font-semibold text-card no-underline"
      >
        Vendre mon vélo
      </NuxtLink>
    </div>
  </header>
</template>
