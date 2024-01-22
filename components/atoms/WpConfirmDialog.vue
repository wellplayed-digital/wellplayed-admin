<template>
  <v-dialog v-model="show" width="auto" persistent v-bind="$attrs">
    <template #activator="slotAttrs">
      <slot name="activator" v-bind="slotAttrs" />
    </template>
    <WpCard>
      <v-card-text class="py-6">
        <div class="text-h6 text-center pa-4 mb-4">
          {{ text }}
        </div>
        <v-row dense>
          <v-col>
            <WpButton size="x-large" block variant="text" @click="cancel">
              Cancelar
            </WpButton>
          </v-col>
          <v-col>
            <WpButton size="x-large" block color="primary" @click="confirm">
              Confirmar
            </WpButton>
          </v-col>
        </v-row>
      </v-card-text>
    </WpCard>
  </v-dialog>
</template>

<script setup>
defineProps({
  text: { type: String, required: true }
})
const emits = defineEmits(['confirm', 'cancel'])
const show = ref(false)
const confirm = () => {
  emits('confirm')
  show.value = false
}
const cancel = () => {
  emits('cancel')
  show.value = false
}
</script>
