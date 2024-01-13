<template>
  <v-expand-transition>
    <div v-if="show">
      <slot />
    </div>
  </v-expand-transition>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: false }
})
</script>
