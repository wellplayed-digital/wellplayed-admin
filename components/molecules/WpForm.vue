<template>
  <v-form v-model="isValid" @submit.prevent="submit">
    <slot />
  </v-form>
</template>

<script setup>
const emits = defineEmits(['submit'])
const isValid = ref(false)
const submit = () => {
  if (isValid.value) {
    emits('submit')
  }
}
</script>
