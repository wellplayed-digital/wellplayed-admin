<template>
  <v-dialog
    v-model="show"
    width="auto"
    persistent
    transition="scale-transition"
  >
    <template #activator="slotAttrs">
      <slot v-bind="{ ...slotAttrs, open }" name="activator" />
    </template>
    <WpCard>
      <v-card-text class="py-6">
        <div class="text-h6 text-center pa-4 mb-4" :class="`text-${color}`">
          {{ text }}
        </div>
        <v-row dense>
          <v-col>
            <WpButton
              size="x-large"
              block
              variant="text"
              :color="color"
              @click="cancel"
            >
              Cancel
            </WpButton>
          </v-col>
          <v-col>
            <WpButton size="x-large" block :color="color" @click="confirm">
              {{ confirmText }}
            </WpButton>
          </v-col>
        </v-row>
      </v-card-text>
    </WpCard>
  </v-dialog>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'primary' },
  text: { type: String, required: true },
  confirmText: { type: String, default: 'Confirm' }
})
const emits = defineEmits(['confirm', 'cancel'])
const show = ref(false)
const confirm = () => {
  show.value = false
  emits('confirm')
}
const cancel = () => {
  show.value = false
  emits('cancel')
}
const open = () => {
  show.value = true
}
</script>
