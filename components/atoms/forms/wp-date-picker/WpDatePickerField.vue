<template>
  <WpTextField
    v-bind="$attrs"
    active
    :model-value="formattedDate"
    :label="label"
    readonly
    :rules="rules"
    :prepend-inner-icon="prependInnerIcon"
    :hide-details="hideDetails"
    :autofocus="autofocus"
    class="wp-date-picker-field"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </WpTextField>
</template>

<script setup>
const { ISOtoFormat } = useDates()
const props = defineProps({
  modelValue: { type: String, default: null },
  label: { type: String, default: 'Date' },
  rules: { type: Array, default: () => [] },
  prependInnerIcon: { type: String, default: 'mdi-calendar' },
  hideDetails: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false }
})
const formattedDate = computed(() => {
  return ISOtoFormat(props.modelValue, { format: 'DATE_MED_WITH_WEEKDAY' })
})
</script>

<style lang="scss" scoped>
.wp-date-picker-field:deep(.v-field) {
  cursor: pointer;
}
</style>
