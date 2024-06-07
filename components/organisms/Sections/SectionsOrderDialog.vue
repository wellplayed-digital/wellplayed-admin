<template>
  <WpAsyncDialog
    title="Change Sections Order"
    width="40rem"
    confirm-text="Save"
    :confirm-function="updateSectionsOrder"
    :fullscreen="display.xs"
    @open="reset"
    @cancel="reset"
    @confirm="$emit('confirm')"
  >
    <template #activator="slotAttrs">
      <slot v-bind="slotAttrs" name="activator" />
    </template>
    <template #default>
      <WpDraggable v-model="sectionsToEdit" @drag-end="reorderSections">
        <template #item="{ element }">
          <WpCard>
            <v-card-text>
              <div class="wp-ellipsis">
                <span class="text-body-1">
                  {{ element.title }}
                </span>
                <span v-if="element.description" class="text-body-2 text-medium-emphasis ml-2">
                  {{ element.description }}
                </span>
              </div>
            </v-card-text>
          </WpCard>
        </template>
      </WpDraggable>
    </template>
  </WpAsyncDialog>
</template>

<script setup>
import { cloneDeep } from 'lodash'
const supabase = useSupabaseClient()
const snackbar = useSnackbar()
const display = ref(useDisplay())
const props = defineProps({
  sections: { type: Array, default: () => [] }
})
defineEmits(['confirm'])
const sectionsToEdit = ref([])
const reorderSections = () => {
  sectionsToEdit.value.forEach((section, index) => {
    section.order = sectionsToEdit.value.length - index
  })
}
const reset = () => {
  sectionsToEdit.value = cloneDeep(props.sections)
  reorderSections()
}
const updateSectionsOrder = async () => {
  const { error } = await supabase.rpc('update_sections_order', { sections: sectionsToEdit.value })
  if (error) { throw error }
  snackbar.success({ text: 'The sections order has been updated successfully' })
}
</script>
