<script setup lang="ts">
// Borne kilométrique stylisée : tête jaune, fût clair, la marque du bord de route.
withDefaults(defineProps<{ size?: number }>(), { size: 28 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <path d="M4 14 C4 7 9 3 16 3 C23 3 28 7 28 14 V29 H4 Z" fill="#fbf9f2" />
    <path d="M4 14 C4 7 9 3 16 3 C23 3 28 7 28 14 V15.5 H4 Z" fill="#ffd42e" />
    <circle cx="16" cy="22" r="5.4" stroke="#17140e" stroke-width="2" />
    <circle cx="16" cy="22" r="1.4" fill="#17140e" />
    <path d="M16 16.6 V27.4 M10.6 22 H21.4 M12.2 18.2 L19.8 25.8 M19.8 18.2 L12.2 25.8" stroke="#17140e" stroke-width="1.1" />
  </svg>
</template>
