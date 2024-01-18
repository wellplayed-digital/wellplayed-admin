<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
    class="wp-date-picker"
    location="bottom"
  >
    <template #activator="{props: slotProps}">
      <WpTextField
        :model-value="formattedDate"
        :label="label"
        readonly
        :rules="rules"
        :prepend-inner-icon="prependInnerIcon"
        :hide-details="hideDetails"
        class="wp-cursor-pointer"
        v-bind="slotProps"
      />
    </template>
    <WpCard class="pt-4 mb-4">
      <v-date-picker
        v-model="date"
        v-bind="$attrs"
        class="w-100"
        :title="label"
        hide-header
        @update:model-value="show = false"
      />
    </WpCard>
  </v-menu>
</template>

<script setup>
const { ISOtoJS, JStoISO, JStoFormat } = useDates()
const props = defineProps({
  modelValue: { type: String, default: null },
  label: { type: String, default: 'Date' },
  rules: { type: Array, default: () => [] },
  prependInnerIcon: { type: String, default: 'mdi-calendar' },
  hideDetails: { type: Boolean, default: false }
})
const emits = defineEmits(['update:modelValue', 'close'])
const show = ref(false)
const date = computed({
  get: () => ISOtoJS(props.modelValue),
  set: value => emits('update:modelValue', JStoISO(value))
})
const formattedDate = computed(() => JStoFormat(date.value, { format: 'DATE_MED_WITH_WEEKDAY' }))
</script>

<style lang="scss" scoped>
.wp-date-picker:deep(.v-date-picker-month__day--selected .v-btn) {
  background-color: rgb(var(--v-theme-primary));
}
.wp-date-picker:deep(.v-btn--variant-outlined) {
  border: none !important;
}
</style>
