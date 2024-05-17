<template>
  <div class="d-flex justify-center align-center">
    <div class="mr-2">
      {{ text }}
    </div>
    <v-progress-circular
      color="amber"
      indeterminate
      :size="25"
      :width="3"
    />
  </div>
</template>

<script setup>
defineProps({
  text: { type: String, default: 'Loading' }
})
</script>
