<template>
  <WpTextField
    v-model="count"
    v-bind="$attrs"
    type="number"
    hide-spin-buttons
    prepend-inner-icon="mdi-minus"
    append-inner-icon="mdi-plus"
    class="wp-text-field cursor-pointer"
    readonly
    @click:prepend-inner="decrement"
    @click:append-inner="increment"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, required: true },
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity }
})
const emits = defineEmits(['update:modelValue'])
const count = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', Number(value))
})
const decrement = () => {
  if (count.value > props.min) {
    count.value--
  }
}
const increment = () => {
  if (count.value < props.max) {
    count.value++
  }
}
</script>

<style lang="scss" scoped>
.wp-text-field:deep(input) {
  text-align: center;
}
</style>
