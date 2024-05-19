<template>
  <WpAsyncDialog
    :title="edit ? 'Edit Project' : 'Create New Project'"
    :width="display.xs ? '100%' : '40rem'"
    :confirm-text="edit ? 'Save' : 'Create'"
    :confirm-function="updateOrCreateProject"
    :fullscreen="display.xs"
    @cancel="reset"
  >
    <template #activator="slotAttrs">
      <slot v-bind="slotAttrs" name="activator" />
    </template>
    <template #default>
      <div class="pb-6">
        <WpFileInput v-model="projectToEdit.cover" hide-details label="Cover" />
      </div>
      <div class="pb-6">
        <WpTextField v-model="projectToEdit.title" hide-details label="Title" />
      </div>
      <div class="pb-6">
        <WpTextarea v-model="projectToEdit.description" hide-details label="Description" />
      </div>
      <div class="d-flex justify-space-between align-center">
        <WpDatePicker
          v-model="projectToEdit.published_at"
          label="Publish Date"
          hide-details
        />
        <div class="pl-4">
          <v-switch
            v-model="projectToEdit.published"
            label="Published"
            inset
            color="primary"
            hide-details
          />
        </div>
      </div>
    </template>
    <template v-if="edit" #append-footer="{ close }">
      <WpConfirmDialog
        text="Are you sure you want to delete this project?"
        color="error"
        confirm-text="Delete"
        @confirm="deleteProject(close)"
      >
        <template #activator="{ props: slotProps }">
          <WpButton
            color="error"
            variant="tonal"
            size="large"
            :loading="deletingProject"
            v-bind="slotProps"
          >
            Delete
          </WpButton>
        </template>
      </WpConfirmDialog>
    </template>
  </WpAsyncDialog>
</template>

<script setup>
import { cloneDeep } from 'lodash'
import WpFileInput from '../../atoms/forms/WpFileInput.vue'
const projectsStore = useProjectsStore()
const display = ref(useDisplay())
const props = defineProps({
  edit: { type: Boolean, default: false },
  project: { type: Object, default: null }
})
const DEFAULT_PROJECT = {
  title: '',
  description: '',
  published_at: null,
  published: false,
  cover: null
}
const getProjectToEdit = () => props.edit ? cloneDeep(props.project) : cloneDeep(DEFAULT_PROJECT)
const projectToEdit = ref(getProjectToEdit())
const reset = () => {
  projectToEdit.value = getProjectToEdit()
}
const updateOrCreateProject = async () => {
  if (props.edit) {
    return await projectsStore.updateProject(
      props.project.id,
      projectToEdit.value.title,
      projectToEdit.value.description,
      projectToEdit.value.published_at,
      projectToEdit.value.published
    )
  } else {
    return await projectsStore.createProject(
      projectToEdit.value.title,
      projectToEdit.value.description,
      projectToEdit.value.published_at,
      projectToEdit.value.published
    )
  }
}
const deletingProject = ref(false)
const deleteProject = async (close) => {
  deletingProject.value = true
  await projectsStore.deleteProject(props.project.id, close)
  deletingProject.value = false
}
</script>
