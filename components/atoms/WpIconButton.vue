<template>
  <v-tooltip
    v-if="tooltipText"
    :text="tooltipText"
    :location="tooltipLocation"
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
  tooltipText: { type: String, default: null },
  tooltipLocation: { type: String, default: 'bottom' }
})
</script>
