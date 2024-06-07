<template>
  <WpAsyncDialog
    title="Change Projects Order"
    width="40rem"
    confirm-text="Save"
    :confirm-function="updateProjectsOrder"
    :fullscreen="display.xs"
    @open="reset"
    @cancel="reset"
    @confirm="$emit('confirm')"
  >
    <template #activator="slotAttrs">
      <slot v-bind="slotAttrs" name="activator" />
    </template>
    <template #default>
      <WpDraggable v-model="projectsToEdit" @drag-end="reorderProjects">
        <template #item="{ element }">
          <WpCard>
            <v-card-text>
              <div class="d-flex justify-space-between align-center">
                <div class="wp-ellipsis">
                  <span class="text-body-1">
                    {{ element.title }}
                  </span>
                  <span v-if="element.description" class="text-body-2 text-medium-emphasis ml-2">
                    {{ element.description }}
                  </span>
                </div>
                <div class="ml-2">
                  <WpChip color="success" size="small">
                    Published
                  </WpChip>
                </div>
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
  projects: { type: Array, default: () => [] }
})
defineEmits(['confirm'])
const projectsToEdit = ref([])
const reorderProjects = () => {
  projectsToEdit.value.forEach((project, index) => {
    project.order = projectsToEdit.value.length - index
  })
}
const reset = () => {
  const publishedProjects = props.projects.filter(project => project.status === 'published')
  projectsToEdit.value = cloneDeep(publishedProjects)
  reorderProjects()
}
const updateProjectsOrder = async () => {
  const { error } = await supabase.rpc('update_projects_order', { projects: projectsToEdit.value })
  if (error) { throw error }
  snackbar.success({ text: 'The projects order has been updated successfully' })
}
</script>
