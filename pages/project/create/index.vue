<template>
  <WpContainer max-width="800px">
    <div class="mb-10 d-flex align-center">
      <WpIconButton icon="mdi-chevron-left" density="compact" size="x-large" to="/projects" />
      <h1 class="text-h5 ml-2">
        Create a new project
      </h1>
    </div>
    <WpForm :loading="loading" @submit="createProject">
      <div>
        <WpTextField v-model="newProject.title" hide-details label="Title" />
      </div>
      <div class="pt-6">
        <WpTextarea v-model="newProject.description" hide-details label="Description" />
      </div>
      <div class="pt-6">
        <WpFileInput v-model="newProject.cover" hide-details label="Cover" />
      </div>
      <div class="pt-6 d-flex justify-space-between align-center">
        <WpDatePicker
          v-model="newProject.published_at"
          label="Publish Date"
          hide-details
          class="mr-4"
        />
        <v-switch
          v-model="newProject.published"
          label="Published"
          inset
          color="primary"
          hide-details
        />
      </div>
      <div class="pt-10 d-flex justify-end">
        <WpButton
          color="primary"
          variant="text"
          size="x-large"
          class="mr-2"
          :disabled="disabled"
          to="/projects"
        >
          Cancel
        </WpButton>
        <WpButton
          color="primary"
          type="submit"
          size="x-large"
          :disabled="disabled"
          :loading="loading"
        >
          Create
        </WpButton>
      </div>
    </WpForm>
  </WpContainer>
</template>

<script setup>
import { cloneDeep } from 'lodash'
const supabase = useSupabaseClient()
const snackbar = useSnackbar()
const DEFAULT_PROJECT = {
  order: null,
  cover: null,
  title: null,
  description: null,
  published_at: null,
  published: false
}
const newProject = ref(cloneDeep(DEFAULT_PROJECT))
const projectsLenght = ref(0)
const disabled = ref(true)
const fetchProjectsLength = async () => {
  try {
    const { data, error } = await supabase.from('projects').select('id')
    if (error) { throw error }
    projectsLenght.value = data.length
    disabled.value = false
  } catch (error) {
    snackbar.error({ text: 'There was an error fetching the projects' })
  }
}
onMounted(fetchProjectsLength)
const loading = ref(false)
const createProject = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.from('projects').insert({
      order: projectsLenght.value + 1,
      // cover: newProject.value.cover,
      title: newProject.value.title,
      description: newProject.value.description,
      published_at: newProject.value.published_at,
      published: newProject.value.published
    }).select().single()
    if (error) { throw error }
    const newProjectId = data.id
    await navigateTo(`/project/edit/${newProjectId}`)
    snackbar.success({ text: 'The project has been created successfully' })
  } catch (error) {
    snackbar.error({ text: 'There was an error creating the project' })
  } finally {
    loading.value = false
  }
}
</script>
