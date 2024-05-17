<template>
  <NuxtLink
    class="wp-brand-logo wp-font-brand wp-reset-link d-inline-flex flex-column align-center wp-user-select-none"
    :to="to"
    :style="{ fontSize }"
  >
    <WpBrandISO
      width="2.5rem"
      :style="{
        width: '4rem',
        marginBottom: '-0.75rem',
      }"
      :loading="loading"
    />
    <span>
      Ayrampo
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
  medium: '2rem',
  large: '3rem'
}
const fontSize = computed(() => fontSizePerSize[props.size])
const loading = ref(false)
</script>
