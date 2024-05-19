<template>
  <WpAsyncDialog
    title="Change Projects Order"
    :width="display.xs ? '100%' : '40rem'"
    confirm-text="Save"
    :confirm-function="updateProjectsOrder"
    :fullscreen="display.xs"
    @open="reset"
    @cancel="reset"
  >
    <template #activator="slotAttrs">
      <slot v-bind="slotAttrs" name="activator" />
    </template>
    <template #default>
      <div>
        <div class="d-flex align-center pb-6">
          <div class="text-body-2 text-medium-emphasis mr-2">
            Order by:
          </div>
          <WpButton size="small" variant="tonal" class="mr-2" @click="orderByCreated">
            Created
          </WpButton>
          <WpButton size="small" variant="tonal" @click="orderByPublished">
            Published
          </WpButton>
        </div>
        <div class="pb-4">
          <div class="text-body-2 text-medium-emphasis">
            Click and drag to reorder the projects.
          </div>
        </div>
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
                      <WpChip v-if="element.published" color="primary" size="small">
                        Published
                      </WpChip>
                      <WpChip v-else size="small">
                        Draft
                      </WpChip>
                    </div>
                  </div>
                </v-card-text>
              </WpCard>
            </div>
          </template>
        </draggable>
      </div>
    </template>
  </WpAsyncDialog>
</template>

<script setup>
import { cloneDeep } from 'lodash'

const projectsStore = useProjectsStore()
const display = ref(useDisplay())
const props = defineProps({
  projects: { type: Array, default: () => [] }
})
const getProjectsToEdit = () => cloneDeep(props.projects)
const projectsToEdit = ref(getProjectsToEdit())
const dragging = ref(null)
const dragStart = (element) => {
  dragging.value = projectsToEdit.value.find(project => project.order === element.oldIndex)
}
const reorderProjects = () => {
  projectsToEdit.value.forEach((project, index) => {
    project.order = index
  })
}
const dragEnd = () => {
  dragging.value = null
  reorderProjects()
}
const updateProjectsOrder = async () => {
  await projectsStore.updateProjectsOrder(projectsToEdit.value)
}
const reset = () => {
  projectsToEdit.value = getProjectsToEdit()
  reorderProjects()
}
const orderByCreated = () => {
  projectsToEdit.value = projectsToEdit.value.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at)
  })
  reorderProjects()
}
const orderByPublished = () => {
  projectsToEdit.value = projectsToEdit.value.sort((a, b) => {
    return new Date(b.published_at) - new Date(a.published_at)
  })
  reorderProjects()
}
</script>
