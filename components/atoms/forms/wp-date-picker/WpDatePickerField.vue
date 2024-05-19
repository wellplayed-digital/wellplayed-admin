<template>
  <WpTextField
    v-bind="$attrs"
    active
    :model-value="formattedDate"
    :label="formattedDate ? label : ''"
    readonly
    :rules="rules"
    :prepend-inner-icon="prependInnerIcon"
    :hide-details="hideDetails"
    :autofocus="autofocus"
    :placeholder="label"
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
const formattedDate = computed(() => ISOtoFormat(props.modelValue))
</script>

<style lang="scss" scoped>
.wp-date-picker-field:deep(.v-field) {
  cursor: pointer;
}
</style>
