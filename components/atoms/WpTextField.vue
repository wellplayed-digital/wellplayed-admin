<template>
  <v-text-field v-bind="$attrs" ref="$textField">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-text-field>
</template>

<script setup>
const $textField = ref()
const focus = async () => {
  await nextTick()
  $textField.value.focus()
}
defineExpose({ focus })
</script>
