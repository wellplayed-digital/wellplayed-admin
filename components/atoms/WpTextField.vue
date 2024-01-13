<template>
  <v-text-field v-bind="$attrs" :variant="variant">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-text-field>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'outlined' }
})
</script>
