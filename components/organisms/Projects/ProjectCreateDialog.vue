<template>
  <WpAsyncDialog
    :title="edit ? 'Edit project' : 'Create project'"
    :width="display.xs ? '100%' : '40rem'"
    :confirm-function="submit"
    persistent
    :fullscreen="display.xs"
    @cancel="reset"
  >
    <template #activator="slotAttrs">
      <slot v-bind="slotAttrs" name="activator" />
    </template>
    <template #default>
      <div class="pb-6">
        <WpTextField v-model="projectToEdit.title" hide-details label="Title" />
      </div>
      <div class="pb-6">
        <WpTextarea v-model="projectToEdit.description" hide-details label="Description" />
      </div>
      <div class="d-flex justify-end">
        <v-switch v-model="projectToEdit.published" label="Published" inset color="primary" hide-details />
      </div>
    </template>
    <template v-if="edit" #append-footer="{ close }">
      <WpButton
        color="error"
        variant="tonal"
        size="large"
        :loading="deletingProject"
        @click="deleteProject(close)"
      >
        Delete
      </WpButton>
    </template>
  </WpAsyncDialog>
</template>

<script setup>
import { cloneDeep } from 'lodash'

const projectsStore = useProjectsStore()
const display = ref(useDisplay())
const props = defineProps({
  edit: { type: Boolean, default: false },
  project: { type: Object, default: null }
})
const DEFAULT_PROJECT = {
  title: '',
  description: '',
  published: false
}
const getProjectToEdit = () => props.edit ? cloneDeep(props.project) : DEFAULT_PROJECT
const projectToEdit = ref(getProjectToEdit())
const submit = async () => {
  if (props.edit) {
    await projectsStore.updateProject(
      props.project.id,
      projectToEdit.value.title,
      projectToEdit.value.description,
      projectToEdit.value.published
    )
  } else {
    await projectsStore.createProject(
      projectToEdit.value.title,
      projectToEdit.value.description,
      projectToEdit.value.published
    )
  }
}
const reset = () => {
  projectToEdit.value = getProjectToEdit()
}
const deletingProject = ref(false)
const deleteProject = async (close) => {
  deletingProject.value = true
  await projectsStore.deleteProject(props.project.id, close)
  deletingProject.value = false
}
</script>
