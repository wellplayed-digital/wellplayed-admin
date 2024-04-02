<template>
  <div class="d-flex align-center">
    <WpTextField
      v-bind="$attrs"
      v-model="count"
      type="number"
      hide-spin-buttons
      readonly
      class="wp-counter-field"
    >
      <template #prepend-inner>
        <WpIconButton
          icon="mdi-minus"
          size="small"
          :disabled="minReached"
          @click="decrement"
        />
      </template>
      <template #append-inner>
        <WpIconButton
          icon="mdi-plus"
          size="small"
          :disabled="maxReached"
          @click="increment"
        />
      </template>
    </WpTextField>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [Number, String], required: true },
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
.wp-counter-field:deep(.v-field) {
  cursor: default;
}
</style>
