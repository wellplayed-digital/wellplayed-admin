<template>
  <v-dialog
    v-model="show"
    :width="width"
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
            <WpButton size="x-large" block variant="text" @click="cancel">
              {{ $t("global.cancel") }}
            </WpButton>
          </v-col>
          <v-col>
            <WpButton size="x-large" block color="primary" @click="confirm">
              {{ $t("global.confirm") }}
            </WpButton>
          </v-col>
        </v-row>
      </v-card-text>
    </WpCard>
  </v-dialog>
</template>

<script setup>
defineProps({
  width: { type: String, default: 'auto' }
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
const open = () => {
  show.value = true
}
</script>
