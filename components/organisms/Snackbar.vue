<template>
  <v-snackbar
    v-model="show"
    location="top"
    multi-line
    :color="color"
  >
    <div>
      {{ text }}
    </div>
    <div v-if="description" class="text-caption mt-2">
      {{ description }}
    </div>
    <template #actions>
      <WpIconButton icon="mdi-close" @click="show = false" />
    </template>
  </v-snackbar>
</template>

<script setup>
const text = ref(null)
const description = ref(null)
const color = ref(null)
const show = ref(false)
const log = ({ text: textValue, description: detailsValue, color: colorValue }) => {
  text.value = textValue
  description.value = detailsValue
  color.value = colorValue
  show.value = true
}
defineExpose({ log })
</script>
