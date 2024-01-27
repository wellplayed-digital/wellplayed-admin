<template>
  <v-text-field ref="$textField" v-bind="$attrs" :variant="variant">
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
