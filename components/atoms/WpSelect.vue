<template>
  <v-select v-bind="$attrs" :variant="variant">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-select>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'outlined' }
})
</script>
