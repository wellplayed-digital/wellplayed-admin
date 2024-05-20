<template>
  <div>
    {{ section }}
  </div>
</template>

<script setup>
defineProps({
  section: { type: Object, required: true }
})
</script>
