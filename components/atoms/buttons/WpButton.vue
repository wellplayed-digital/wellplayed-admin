<template>
  <v-tooltip v-if="tooltipText" :text="tooltipText" :location="tooltipLocation">
    <template #activator="{ props: slotProps }">
      <v-btn v-bind="{ ...$attrs, ...slotProps }" :color="color" elevation="0">
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName" />
        </template>
      </v-btn>
    </template>
  </v-tooltip>
  <v-btn v-else v-bind="$attrs" :color="color" elevation="0">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-btn>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'primary' },
  tooltipText: { type: String, default: null },
  tooltipLocation: { type: String, default: 'bottom' }
})
</script>

<style lang="scss" scoped>
:deep(.v-btn__overlay) {
  transition: all 0.2s ease-in-out;
}
</style>
