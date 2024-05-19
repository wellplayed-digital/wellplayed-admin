<template>
  <WpContainer max-width="800px">
    <div class="mb-10 d-flex align-center">
      <WpIconButton icon="mdi-chevron-left" density="compact" size="x-large" to="/projects" />
      <h1 class="text-h5 ml-2">
        Edit project
      </h1>
    </div>
    <WpForm :disabled="disabled || loading || project.deleted" @submit="editProject">
      <div>
        <WpTextField v-model="projectToEdit.title" hide-details label="Title" />
      </div>
      <div class="pt-6">
        <WpTextarea v-model="projectToEdit.description" hide-details label="Description" />
      </div>
      <div class="pt-6">
        <WpFileInput v-model="projectToEdit.cover" hide-details label="Cover" />
      </div>
      <div class="pt-6 d-flex align-center">
        <div class="flex-grow-1">
          <WpDatePicker
            v-model="projectToEdit.published_at"
            label="Publish Date"
            hide-details
            clearable
          />
        </div>
        <div class="pl-6">
          <v-switch
            v-model="projectToEdit.published"
            label="Published"
            inset
            color="primary"
            hide-details
          />
        </div>
      </div>
      <div class="pt-10 d-flex justify-space-between">
        <WpButton
          v-if="projectToEdit.deleted"
          variant="tonal"
          size="x-large"
          @click="restoreProject"
        >
          Restore
        </WpButton>
        <WpButton
          v-else
          color="error"
          variant="tonal"
          size="x-large"
          @click="deleteProject"
        >
          Delete
        </WpButton>
        <div class="d-flex justify-end">
          <WpButton
            color="primary"
            variant="text"
            size="x-large"
            class="mr-2"
            :disabled="disabled"
            @click="reset"
          >
            Cancel
          </WpButton>
          <WpButton
            type="submit"
            color="primary"
            size="x-large"
            :disabled="disabled"
            :loading="loading"
          >
            Save
          </WpButton>
        </div>
      </div>
    </WpForm>
  </WpContainer>
</template>

<script setup>
import { cloneDeep } from 'lodash'
const supabase = useSupabaseClient()
const route = useRoute()
const projectId = route.params.id
const snackbar = useSnackbar()
const DEFAULT_PROJECT = {
  order: null,
  title: null,
  description: null,
  cover: null,
  published_at: null,
  published: false
}
const disabled = ref(true)
const project = ref(cloneDeep(DEFAULT_PROJECT))
const projectToEdit = ref(cloneDeep(project.value))
const reset = () => {
  projectToEdit.value = cloneDeep(project.value)
}
const fetchProject = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select()
      .eq('id', route.params.id)
      .single()
    if (error) { throw error }
    project.value = data
    reset()
    disabled.value = false
  } catch (error) {
    snackbar.error({ text: 'There was an error fetching the project' })
  }
}
onMounted(fetchProject)
const loading = ref(false)
const editProject = async () => {
  try {
    loading.value = true
    const { error } = await supabase.from('projects').update({
      updated_at: new Date().toUTCString(),
      title: projectToEdit.value.title,
      description: projectToEdit.value.description,
      published_at: projectToEdit.value.publishedAt,
      published: projectToEdit.value.published
    }).eq('id', project.value.id)
    if (error) { throw error }
    await navigateTo('/projects')
    snackbar.success({ text: 'The project has been updated successfully' })
  } catch (error) {
    snackbar.error({ text: 'There was an error updating the project' })
  } finally {
    loading.value = false
  }
}
const deleteProject = async () => {
  try {
    loading.value = true
    const { error } = await supabase.from('projects').update({
      updated_at: new Date().toUTCString(),
      published: false,
      deleted: true
    }).eq('id', projectId)
    if (error) { throw error }
    await fetchProject()
    snackbar.success({ text: 'The project has been deleted successfully' })
  } catch (error) {
    snackbar.error({ text: 'There was an error deleting the project' })
    return { cancel: true }
  } finally {
    loading.value = false
  }
}
const restoreProject = async () => {
  try {
    loading.value = true
    const { error } = await supabase.from('projects').update({
      updated_at: new Date().toUTCString(),
      deleted: false
    }).eq('id', projectId)
    if (error) { throw error }
    await fetchProject()
    snackbar.success({ text: 'The project has been restored successfully' })
  } catch (error) {
    snackbar.error({ text: 'There was an error restoring the project' })
  } finally {
    loading.value = false
  }
}
</script>
