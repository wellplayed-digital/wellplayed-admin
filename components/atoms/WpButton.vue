<template>
  <v-btn :color="color" elevation="0">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-btn>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'white' }
})
</script>
