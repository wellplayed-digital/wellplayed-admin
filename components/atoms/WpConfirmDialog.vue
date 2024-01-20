<template>
  <div>
    <v-dialog v-model="show" width="auto" persistent>
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
    <slot name="default" v-bind="{ askToConfirm }" />
  </div>
</template>

<script setup>
const props = defineProps({
  confirmAction: { type: Function, required: true },
  cancelAction: { type: Function, required: true },
  text: { type: String, required: true }
})
const show = ref(false)
const askToConfirm = () => {
  show.value = true
}
const confirm = () => {
  props.confirmAction()
  show.value = false
}
const cancel = () => {
  props.cancelAction()
  show.value = false
}
</script>
