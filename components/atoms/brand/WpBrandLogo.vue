<template>
  <NuxtLink
    class="wp-brand-logo wp-reset-link d-inline-flex align-center wp-user-select-none"
    :to="to"
    :style="{ fontSize }"
  >
    <WpBrandISO
      :style="{ width: '1.5rem', marginBottom: '1rem' }"
      :loading="loading"
    />
    <span class="ml-4">
      Wellplayed Admin
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: { type: String, default: null },
  size: { type: String, default: 'medium' }
})
const fontSizePerSize = {
  small: '1.5rem',
  medium: '1.5rem',
  large: '3rem'
}
const fontSize = computed(() => fontSizePerSize[props.size])
const loading = ref(false)
</script>
