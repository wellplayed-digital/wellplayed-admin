<template>
  <v-dialog
    v-if="display.xs"
    v-model="show"
    fullscreen
    transition="scale-transition"
  >
    <template #activator="{props: slotProps}">
      <WpDatePickerField
        :model-value="date"
        :label="label"
        :rules="rules"
        :prepend-inner-icon="prependInnerIcon"
        :hide-details="hideDetails"
        :autofocus="autofocus"
        v-bind="slotProps"
      >
        <template #append-inner>
          <slot name="append-inner" />
        </template>
      </WpDatePickerField>
    </template>
    <WpCard class="pt-4">
      <WpDatePickerCalendar
        v-model="date"
        v-bind="$attrs"
        @update:model-value="show = false"
      >
        <template #title>
          <div class="d-flex justify-space-between align-center">
            <div>{{ label }}</div>
            <div>
              <WpIconButton icon="mdi-close" @click="show = false" />
            </div>
          </div>
        </template>
      </WpDatePickerCalendar>
    </WpCard>
  </v-dialog>
  <v-menu
    v-else
    v-model="show"
    :close-on-content-click="false"
    location="bottom"
  >
    <template #activator="{props: slotProps}">
      <WpDatePickerField
        :model-value="date"
        :label="label"
        :rules="rules"
        :prepend-inner-icon="prependInnerIcon"
        :hide-details="hideDetails"
        :autofocus="autofocus"
        v-bind="slotProps"
      >
        <template #append-inner>
          <slot name="append-inner" />
        </template>
      </WpDatePickerField>
    </template>
    <WpCard class="pt-4 mb-4">
      <WpDatePickerCalendar
        v-model="date"
        :title="label"
        v-bind="$attrs"
        hide-header
        @update:model-value="show = false"
      />
    </WpCard>
  </v-menu>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const date = defineModel({ type: String, default: null })
const props = defineProps({
  label: { type: String, default: 'Date' },
  rules: { type: Array, default: () => [] },
  prependInnerIcon: { type: String, default: 'mdi-calendar' },
  hideDetails: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false }
})
const display = ref(useDisplay())
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
