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
      <v-card-text class="py-6">
        <div class="mb-4">
          <slot name="default" />
        </div>
        <v-row dense>
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
              @click="confirm"
            >
              {{ $t("global.confirm") }}
            </WpButton>
          </v-col>
        </v-row>
      </v-card-text>
    </WpCard>
  </v-dialog>
</template>

<script setup>
const snackbar = useSnackbar()
const props = defineProps({
  width: { type: String, default: 'auto' },
  confirmFunction: { type: Function, default: () => {} }
})
const emits = defineEmits(['confirm', 'cancel'])
const show = ref(false)
const loading = ref(false)
const confirm = async () => {
  try {
    loading.value = true
    const { data, error } = await props.confirmFunction()
    if (error.value) {
      snackbar.error({ text: error.value.data.message })
      return
    }
    emits('confirm', data.value)
    show.value = false
  } catch (error) {
    snackbar.error({ text: error.message || 'Oops! Something went wrong!' })
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
