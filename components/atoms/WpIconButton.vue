<template>
  <v-tooltip
    v-if="tooltip"
    v-bind="tooltipProps"
    :location="tooltipProps.location || 'bottom'"
    theme="light"
  >
    <template #activator="{ props: slotProps }">
      <v-btn
        :icon="icon"
        :variant="variant"
        v-bind="{ ...$attrs, ...slotProps }"
      >
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName" />
        </template>
      </v-btn>
    </template>
  </v-tooltip>
  <v-btn
    v-else
    :icon="icon"
    :variant="variant"
    v-bind="$attrs"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-btn>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
  variant: { type: String, default: 'text' },
  tooltip: { type: Boolean, default: false },
  tooltipProps: { type: Object, default: () => ({}) }
})
</script>
