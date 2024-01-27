<template>
  <v-form ref="$form" v-model="valid" v-bind="$attrs" @submit.prevent="submit">
    <slot v-bind="{ valid }" />
  </v-form>
</template>

<script setup>
const emits = defineEmits(['submit'])
const $form = ref()
const valid = ref(false)
const submit = () => {
  if (valid.value) {
    emits('submit')
  }
}
</script>
