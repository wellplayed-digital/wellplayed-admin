<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
    class="wp-date-picker"
    location="bottom"
  >
    <template #activator="{props: slotProps}">
      <WpDatePickerField
        :model-value="modelValue"
        :label="label"
        :rules="rules"
        :prepend-inner-icon="prependInnerIcon"
        :hide-details="hideDetails"
        :autofocus="autofocus"
        v-bind="slotProps"
      />
    </template>
    <WpCard class="pt-4 mb-4">
      <WpDatePickerCalendar
        v-bind="$attrs"
        :title="label"
        @update:model-value="show = false"
      />
      <!-- <v-date-picker
        v-model="date"
        v-bind="$attrs"
        class="w-100"
        :title="label"
        hide-header
        @update:model-value="show = false"
      /> -->
    </WpCard>
  </v-menu>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: null },
  label: { type: String, default: 'Date' },
  rules: { type: Array, default: () => [] },
  prependInnerIcon: { type: String, default: 'mdi-calendar' },
  hideDetails: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false }
})
const show = ref(props.autofocus)
</script>

<style lang="scss" scoped>
.wp-date-picker:deep(.v-date-picker-month__day--selected .v-btn) {
  background-color: rgb(var(--v-theme-primary));
}
.wp-date-picker:deep(.v-btn--variant-outlined) {
  border: none !important;
}
</style>
