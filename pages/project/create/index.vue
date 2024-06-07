<template>
  <WpContainer max-width="800px">
    <div class="mb-10 d-flex align-center">
      <WpIconButton
        icon="mdi-chevron-left"
        density="compact"
        size="x-large"
        class="ml-n4 mr-2"
        to="/projects"
      />
      <h1 class="text-h5">
        Create a new project
      </h1>
    </div>
    <WpForm :disabled="loading" @submit="createProject">
      <WpTextField
        v-model="newProject.title"
        label="Title"
        :rules="[required]"
        class="mb-4"
      />
      <WpTextarea
        v-model="newProject.description"
        hide-details
        label="Description"
        class="mb-6"
      />
      <WpFileInput
        v-model="newProject.cover"
        hide-details
        label="Cover"
      />
      <WpDivider class="my-8" />
      <div class="d-flex align-center mb-8">
        <WpDatePicker
          v-model="newProject.published_at"
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
      <div class="d-flex justify-end">
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
const { required } = useRules()
const DEFAULT_PROJECT = {
  cover: null,
  title: null,
  description: null,
  published_at: null,
  status: 'draft'
}
const newProject = ref(cloneDeep(DEFAULT_PROJECT))
const published = ref(false)
const projectsLenght = ref(0)
const disabled = ref(true)
const fetchProjectsLength = async () => {
  try {
    const { data, error } = await supabase.from('projects').select('id').eq('status', 'published')
    if (error) { throw error }
    projectsLenght.value = data.length
    disabled.value = false
  } catch {
    snackbar.error({ text: 'There was an error fetching the amount of projects' })
  }
}
onMounted(async () => {
  await fetchProjectsLength()
})
const loading = ref(false)
const createProject = async () => {
  loading.value = true
  await fetchProjectsLength()
  try {
    const { data, error } = await supabase.from('projects').insert({
      order: published.value ? projectsLenght.value + 1 : 0,
      title: newProject.value.title,
      description: newProject.value.description,
      // cover: newProject.value.cover,
      published_at: newProject.value.published_at,
      status: published.value ? 'published' : 'draft'
    }).select().single()
    if (error) { throw error }
    await navigateTo(`/project/edit/${data.id}`)
    snackbar.success({ text: 'The project has been created successfully' })
  } catch {
    snackbar.error({ text: 'There was an error creating the project' })
  } finally {
    loading.value = false
  }
}
</script>
