<template>
  <v-tooltip v-if="tooltipText" :text="tooltipText" :location="tooltipLocation">
    <template #activator="{ props: slotProps }">
      <v-btn v-bind="{ ...$attrs, ...slotProps }" :icon="icon" :variant="variant">
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName" />
        </template>
      </v-btn>
    </template>
  </v-tooltip>
  <v-btn v-else v-bind="$attrs" :icon="icon" :variant="variant">
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
