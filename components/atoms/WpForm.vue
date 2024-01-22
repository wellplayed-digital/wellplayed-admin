<template>
  <v-form v-model="valid" v-bind="$attrs" @submit.prevent="submit">
    <slot />
  </v-form>
</template>

<script setup>
const emits = defineEmits(['submit'])
const valid = ref(false)
const submit = () => {
  if (valid.value) {
    emits('submit')
  }
}
</script>
