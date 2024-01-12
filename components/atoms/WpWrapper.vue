<template>
  <div class="d-flex justify-center">
    <div class="w-100" :style="{ maxWidth }">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  maxWidth: { type: String, default: '100%' }
})
</script>
