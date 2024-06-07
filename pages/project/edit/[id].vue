<template>
  <WpContainer max-width="800px">
    <div class="pb-10 d-flex align-center">
      <WpIconButton
        icon="mdi-chevron-left"
        density="compact"
        size="x-large"
        class="ml-n4 mr-2"
        to="/projects"
      />
      <h1 class="text-h5">
        Edit project
      </h1>
    </div>
    <WpForm :disabled="disabled || loading || project.status === 'deleted'" @submit="editProject">
      <WpTextField v-model="projectToEdit.title" label="Title" :rules="[required]" class="mb-4" />
      <WpTextarea v-model="projectToEdit.description" hide-details label="Description" class="mb-6" />
      <WpFileInput v-model="projectToEdit.cover" hide-details label="Cover" />
      <WpDivider class="my-8" />
      <SectionsList :project-id="projectId" />
      <WpDivider class="my-8" />
      <div class="d-flex align-center mb-8">
        <WpDatePicker
          v-model="projectToEdit.published_at"
          label="Publish Date"
          hide-details
          clearable
          class="mr-4"
        />
        <v-switch
          v-model="published"
          label="Published"
          inset
          color="primary"
          hide-details
        />
      </div>
      <div class="d-flex justify-space-between">
        <WpButton
          v-if="project.status !== 'deleted'"
          color="error"
          variant="tonal"
          size="x-large"
          :loading="loading"
          @click="deleteProject"
        >
          Delete
        </WpButton>
        <WpButton
          v-else
          color="success"
          variant="tonal"
          size="x-large"
          :loading="loading"
          @click="restoreProject"
        >
          Restore
        </WpButton>
        <WpButton
          type="submit"
          color="primary"
          size="x-large"
          :disabled="disabled || project.status === 'deleted'"
          :loading="loading"
        >
          Save
        </WpButton>
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
const { required } = useRules()
const DEFAULT_PROJECT = {
  order: null,
  title: null,
  description: null,
  cover: null,
  published_at: null,
  status: 'draft'
}
const project = ref(null)
const projectToEdit = ref(null)
const published = ref(null)
const setProject = (data) => {
  project.value = cloneDeep(data)
  projectToEdit.value = cloneDeep(data)
  published.value = data.status === 'published'
}
setProject(DEFAULT_PROJECT)
const disabled = ref(true)
const fetchProject = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select()
      .eq('id', route.params.id)
      .single()
    if (error) { throw error }
    setProject(data)
    disabled.value = false
  } catch (error) {
    snackbar.error({ text: 'There was an error fetching the project' })
  }
}
onMounted(fetchProject)
const loading = ref(false)
const projectsLenght = ref(0)
const fetchProjectsLength = async () => {
  try {
    const { data, error } = await supabase.from('projects').select('id').eq('status', 'published')
    if (error) { throw error }
    projectsLenght.value = data.length
  } catch (error) {
    snackbar.error({ text: 'There was an error fetching the projects' })
  }
}
const editProject = async () => {
  await fetchProjectsLength()
  try {
    loading.value = true
    const projectOrder = !published.value ? 0 : project.value.order > 0 ? project.value.order : projectsLenght.value + 1
    const { error } = await supabase.from('projects').update({
      order: projectOrder,
      title: projectToEdit.value.title,
      description: projectToEdit.value.description,
      published_at: projectToEdit.value.published_at,
      status: published.value ? 'published' : 'draft',
      updated_at: new Date().toUTCString()
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
      order: -1,
      status: 'deleted',
      updated_at: new Date().toUTCString()
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
  loading.value = true
  try {
    const { error } = await supabase.from('projects').update({
      order: 0,
      status: 'draft',
      updated_at: new Date().toUTCString()
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
