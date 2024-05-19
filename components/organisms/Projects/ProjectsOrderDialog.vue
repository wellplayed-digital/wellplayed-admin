<template>
  <WpAsyncDialog
    title="Change Projects Order"
    :width="display.xs ? '100%' : '40rem'"
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
      <draggable
        v-model="projectsToEdit"
        item-key="id"
        @start="dragStart"
        @end="dragEnd"
      >
        <template #item="{ element }">
          <div
            class="py-1 wp-cursor-grab"
            :style="{ opacity: element.id === dragging?.id ? '0' : '1' }"
          >
            <WpCard
              :variant="element.published ? 'flat' : 'tonal'"
              :style="{ opacity: element.published ? '1' : '0.5' }"
              :disabled="loading"
            >
              <v-card-text class="wp-pointer-events-none">
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
                    <WpChip color="primary" size="small">
                      Published
                    </WpChip>
                  </div>
                </div>
              </v-card-text>
            </WpCard>
          </div>
        </template>
      </draggable>
    </template>
  </WpAsyncDialog>
</template>

<script setup>
import { cloneDeep } from 'lodash'
const supabase = useSupabaseClient()
const display = ref(useDisplay())
const props = defineProps({
  projects: { type: Array, default: () => [] }
})
defineEmits(['confirm'])
const projectsToEdit = ref([])
const dragging = ref(null)
const dragStart = (element) => {
  const originalOrder = projectsToEdit.value.length - element.oldIndex
  dragging.value = projectsToEdit.value.find(project => project.order === originalOrder)
}
const reorderProjects = () => {
  projectsToEdit.value.forEach((project, index) => {
    project.order = projectsToEdit.value.length - index
  })
}
const reset = () => {
  const publishedProjects = props.projects.filter(project => project.published && !project.deleted)
  projectsToEdit.value = cloneDeep(publishedProjects)
  reorderProjects()
}
const dragEnd = () => {
  dragging.value = null
  reorderProjects()
}
const loading = ref(false)
const updateProjectsOrder = async () => {
  const { error } = await supabase.rpc('update_projects_order', { projects: projectsToEdit.value })
  if (error) { throw error }
}
</script>
