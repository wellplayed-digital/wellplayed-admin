<template>
  <v-btn v-bind="$attrs" :icon="icon">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-btn>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' }
})
</script>
