<template>
  <v-date-picker
    v-model="date"
    v-bind="$attrs"
    class="wp-date-picker w-100"
    :title="title"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-date-picker>
</template>

<script setup>
const { ISOtoJS, JStoISO } = useDates()
const props = defineProps({
  modelValue: { type: String, default: null },
  title: { type: String, default: null }
})
const emits = defineEmits(['update:modelValue'])
const date = computed({
  get: () => ISOtoJS(props.modelValue),
  set: value => emits('update:modelValue', JStoISO(value))
})
</script>

<style lang="scss" scoped>
.wp-date-picker:deep(.v-date-picker-month__day--selected .v-btn) {
  background-color: rgb(var(--v-theme-primary));
}
.wp-date-picker:deep(.v-btn--variant-outlined) {
  border: none !important;
}
</style>
