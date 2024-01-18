<template>
  <NuxtLink class="wp-font-brand wp-reset-link" :to="to" :style="{ fontSize }">
    Ayrampo
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: { type: String, default: null },
  size: { type: String, default: 'medium' }
})
const fontSizePerSize = {
  small: '1.5rem',
  medium: '2rem',
  large: '3rem'
}
const fontSize = computed(() => fontSizePerSize[props.size])
</script>
