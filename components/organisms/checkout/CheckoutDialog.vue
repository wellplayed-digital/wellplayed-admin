<template>
  <WpDialog width="800">
    <template #activator="slotAttrs">
      <slot name="activator" v-bind="slotAttrs" />
    </template>
    <div>
      {{ result }}
    </div>
  </WpDialog>
</template>

<script setup>
defineProps({
  result: { type: Object, required: true }
})
</script>
