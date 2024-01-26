<template>
  <v-tooltip
    v-bind="tooltipProps"
    :location="tooltipProps.location || 'bottom'"
    theme="light"
  >
    <template #activator="{ props: slotProps }">
      <v-btn
        variant="text"
        :icon="icon"
        v-bind="{ ...$attrs, ...slotProps }"
      >
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName" />
        </template>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
  tooltipProps: { type: Object, default: null }
})
</script>
