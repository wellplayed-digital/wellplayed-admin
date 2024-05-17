<template>
  <v-text-field v-bind="$attrs" ref="$textField" :variant="variant" class="wp-text-field">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-text-field>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'outlined' }
})
const $textField = ref()
const focus = async () => {
  await nextTick()
  $textField.value.focus()
}
defineExpose({ focus })
</script>

<style lang="scss" scoped>
.wp-text-field:deep(input) {
  user-select: none !important;
  pointer-events: none !important;
}
</style>
