<template>
  <v-btn :color="color" elevation="0" v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-btn>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'white' }
})
</script>

<style lang="scss" scoped>
:deep(.v-btn__overlay) {
  transition: all 0.2s ease-in-out;
}
</style>
