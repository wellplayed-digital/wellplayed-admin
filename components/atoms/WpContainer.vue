<template>
  <v-container class="d-flex justify-center">
    <div class="w-100" :style="{ maxWidth }">
      <slot />
    </div>
  </v-container>
</template>

<script setup>
defineProps({
  maxWidth: { type: String, default: '100%' }
})
</script>
