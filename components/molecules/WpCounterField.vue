<template>
  <WpTextField
    v-model="count"
    v-bind="$attrs"
    type="number"
    hide-spin-buttons
    prepend-inner-icon="mdi-minus"
    append-inner-icon="mdi-plus"
    class="wp-text-field"
    @click:prepend-inner="decrement"
    @click:append-inner="increment"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, required: true }
})
const emits = defineEmits(['update:modelValue'])
const count = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
const decrement = () => {
  if (count.value > 1) {
    count.value--
  }
}
const increment = () => {
  count.value++
}
</script>

<style lang="scss" scoped>
.wp-text-field:deep(input) {
  text-align: center;
}
</style>
