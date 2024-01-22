<template>
  <v-snackbar
    v-model="show"
    v-bind="$attrs"
    multi-line
  >
    {{ text }}
    <template #actions>
      <v-btn
        color="red"
        variant="text"
        @click="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
defineProps({
  text: { type: String, required: true }
})
const show = ref(false)
</script>
