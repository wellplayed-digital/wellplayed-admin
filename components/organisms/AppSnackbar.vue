<template>
  <v-snackbar
    v-model="show"
    multi-line
    theme="light"
    :color="color"
  >
    <div>
      {{ text }}
    </div>
    <template #actions>
      <WpIconButton icon="mdi-close" @click="show = false" />
    </template>
  </v-snackbar>
</template>

<script setup>
const text = ref(null)
const color = ref(null)
const show = ref(false)
const log = ({ text: textValue, color: colorValue }) => {
  text.value = textValue
  color.value = colorValue
  show.value = true
}
defineExpose({ log })
</script>
