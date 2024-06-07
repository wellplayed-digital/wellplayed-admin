<template>
  <v-form v-bind="$attrs" v-model="valid" @submit.prevent="submit">
    <slot v-bind="{ valid }" />
  </v-form>
</template>

<script setup>
const emits = defineEmits(['submit'])
const valid = ref(true)
const submit = () => {
  if (valid.value) {
    emits('submit')
  }
}
</script>
