<template>
  <v-dialog
    v-model="show"
    :width="width"
    persistent
    transition="scale-transition"
  >
    <template #activator="slotAttrs">
      <slot name="activator" v-bind="{ ...slotAttrs, open }" />
    </template>
    <WpCard>
      <v-card-text class="py-6 d-flex flex-column flex-grow-0">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <h3 class="text-h6 text-medium-emphasis">
              {{ title }}
            </h3>
          </div>
          <WpIconButton icon="mdi-close" @click="close" />
        </div>
      </v-card-text>
      <WpDivider />
      <v-card-text class="py-8 d-flex flex-column flex-grow-1">
        <p v-if="subtitle" class="pb-8" :class="display.smAndDown ? 'text-h5' : 'text-h4'">
          {{ subtitle }}
        </p>
        <div>
          <slot name="default" />
        </div>
      </v-card-text>
      <WpDivider />
      <v-card-text class="py-6 flex-grow-0">
        <div class="d-flex">
          <div v-if="$slots['append-footer']">
            <slot name="append-footer" v-bind="{ close }" />
          </div>
          <div class="flex-grow-1 d-flex justify-end">
            <WpButton
              size="large"
              variant="text"
              class="mr-2"
              @click="cancel"
            >
              {{ cancelText }}
            </WpButton>
            <WpButton
              size="large"
              color="primary"
              :loading="loading"
              :disabled="!canConfirm"
              @click="confirm"
            >
              {{ confirmText }}
            </WpButton>
          </div>
        </div>
      </v-card-text>
    </WpCard>
  </v-dialog>
</template>

<script setup>
const display = ref(useDisplay())
const snackbar = useSnackbar()
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: null },
  width: { type: String, default: 'auto' },
  confirmText: { type: String, default: 'Confirm' },
  confirmFunction: { type: Function, default: () => {} },
  canConfirm: { type: Boolean, default: true },
  cancelText: { type: String, default: 'Cancel' }
})
const emits = defineEmits(['confirm', 'cancel'])
const show = ref(false)
const loading = ref(false)
const confirm = async () => {
  try {
    loading.value = true
    const res = await props.confirmFunction()
    if (res?.cancel) { return }
    emits('confirm')
    show.value = false
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    loading.value = false
  }
}
const cancel = () => {
  emits('cancel')
  show.value = false
}
const open = () => {
  show.value = true
}
const close = () => {
  show.value = false
}
</script>
