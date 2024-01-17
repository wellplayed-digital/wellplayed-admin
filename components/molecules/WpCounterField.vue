<template>
  <WpTextField
    v-model="count"
    v-bind="$attrs"
    type="number"
    hide-spin-buttons
    readonly
    variant="outlined"
    prepend-inner-icon="mdi-minus"
    append-inner-icon="mdi-plus"
    class="wp-counter-field cursor-pointer"
    :class="{
      'wp-counter-field--min-reached': minReached,
      'wp-counter-field--max-reached': maxReached
    }"
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
const minReached = computed(() => count.value <= props.min)
const maxReached = computed(() => count.value >= props.max)
const decrement = () => {
  if (!minReached.value) {
    count.value--
  }
}
const increment = () => {
  if (!maxReached.value) {
    count.value++
  }
}
</script>

<style lang="scss" scoped>
.wp-counter-field:deep(input) {
  text-align: center;
}
.wp-counter-field--min-reached:deep(.v-field__prepend-inner) {
  opacity: 0;
}
.wp-counter-field--max-reached:deep(.v-field__append-inner) {
  opacity: 0;
}
</style>
