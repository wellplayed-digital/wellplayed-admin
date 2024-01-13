<template>
  <v-btn :color="color" variant="flat">
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
