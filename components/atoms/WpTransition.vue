<template>
  <v-expand-transition>
    <div v-if="show">
      <slot />
    </div>
  </v-expand-transition>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false }
})
const emits = defineEmits(['update:modelValue'])
const show = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
</script>
