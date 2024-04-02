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
      <v-card-text class="py-6 d-flex flex-column">
        <div class="flex-grow-1">
          <slot name="default" />
        </div>
        <div>
          <slot name="append-footer" />
          <v-row dense class="mt-6">
            <v-col>
              <WpButton
                size="x-large"
                block
                variant="text"
                @click="cancel"
              >
                {{ $t("global.cancel") }}
              </WpButton>
            </v-col>
            <v-col>
              <WpButton
                size="x-large"
                block
                color="primary"
                :loading="loading"
                :disabled="!canConfirm"
                @click="confirm"
              >
                {{ $t("global.confirm") }}
              </WpButton>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </WpCard>
  </v-dialog>
</template>

<script setup>
const snackbar = useSnackbar()
const props = defineProps({
  width: { type: String, default: 'auto' },
  confirmFunction: { type: Function, default: () => {} },
  canConfirm: { type: Boolean, default: true }
})
const emits = defineEmits(['confirm', 'cancel'])
const show = ref(false)
const loading = ref(false)
const confirm = async () => {
  try {
    loading.value = true
    await props.confirmFunction()
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
</script>
