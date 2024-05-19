<template>
  <WpForm :loading="loading" @submit="createProject">
    <div>
      <WpFileInput v-model="newProject.cover" hide-details label="Cover" />
    </div>
    <div class="pt-6">
      <WpTextField v-model="newProject.title" hide-details label="Title" />
    </div>
    <div class="pt-6">
      <WpTextarea v-model="newProject.description" hide-details label="Description" />
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
    <div class="pt-6 d-flex justify-end">
      <WpButton color="primary" type="submit">
        Create
      </WpButton>
    </div>
  </WpForm>
</template>

<script setup>
const snackbar = useSnackbar()
const DEFAULT_PROJECT = {
  order: null,
  cover: null,
  title: null,
  description: null,
  published_at: null,
  published: false
}
const newProject = ref(DEFAULT_PROJECT)
const projectsLenght = ref(0)
const loading = ref(false)
const createProject = async () => {
  try {
    loading.value = true
    const { error } = await supabase.from('projects').insert({
      order: projectsLenght.value + 1,
      cover: newProject.value.cover,
      title: newProject.value.title,
      description: newProject.value.description,
      published_at: newProject.value.published_at,
      published: newProject.value.published
    })
    if (error) { throw error }
    snackbar.success({ text: 'The project has been created successfully' })
  } catch (error) {
    snackbar.error({ text: 'There was an error creating the project' })
  } finally {
    await fetchProjects()
    loading.value = false
  }
}
</script>
