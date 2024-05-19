<template>
  <WpContainer>
    <div class="d-flex justify-space-between pb-6">
      <div class="d-flex align-center">
        <h1 class="text-h4 mr-6">
          Projects
        </h1>
        <WpChip :color="showPublished ? 'primary' : 'default'" class="mr-2" @click="tooglePublished">
          Published
        </WpChip>
        <WpChip :color="showDraft ? 'info' : 'default'" class="mr-2" @click="toogleDraft">
          Draft
        </WpChip>
        <WpChip :color="showDeleted ? 'error' : 'default'" @click="toogleDeleted">
          Deleted
        </WpChip>
      </div>
      <div>
        <ProjectsOrderDialog :projects="projects" @confirm="fetchProjects">
          <template #activator="{props: slotProps}">
            <WpButton v-bind="slotProps" size="large" variant="tonal" class="mr-2" :disabled="disabled">
              Change Order
            </WpButton>
          </template>
        </ProjectsOrderDialog>
        <WpButton size="large" to="/project/create" :disabled="disabled">
          New Project
        </WpButton>
      </div>
    </div>
    <v-row>
      <v-col v-for="project in filteredProjects" :key="project.id" md="6" lg="3">
        <ProjectCard :project="project" />
      </v-col>
    </v-row>
  </WpContainer>
</template>

<script setup>
definePageMeta({
  title: 'Projects'
})
const supabase = useSupabaseClient()
const snackbar = useSnackbar()
const disabled = ref(true)
const projects = ref([])
const showPublished = ref(true)
const showDraft = ref(true)
const showDeleted = ref(false)
const filteredProjects = computed(() => projects.value.filter((project) => {
  if (project.status === 'published' && showPublished.value) { return true }
  if (project.status === 'draft' && showDraft.value) { return true }
  if (project.status === 'deleted' && showDeleted.value) { return true }
  return false
}))
const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: false })
      .order('created_at', { ascending: false })
    if (error) { throw error }
    projects.value = data
    disabled.value = false
  } catch (error) {
    snackbar.error({ text: error.message })
  }
}
onMounted(fetchProjects)
const tooglePublished = async () => {
  showPublished.value = !showPublished.value
  await fetchProjects()
}
const toogleDraft = async () => {
  showDraft.value = !showDraft.value
  await fetchProjects()
}
const toogleDeleted = async () => {
  showDeleted.value = !showDeleted.value
  await fetchProjects()
}
// const route = useRoute()
// const userStore = useUserStore()
// onMounted(async () => {
//   await fetchProjects()
//   // Check if comes from magic link
//   if (route.query.error === 'unauthorized_client') {
//     snackbar.error({ text: 'The link is invalid or has expired' })
//     return
//   }
//   if (route.query.code && userStore.user) {
//     const userAlias = userStore.profile?.first_name || userStore.user.email
//     snackbar.success({ text: `Welcome ${userAlias}` })
//   }
// })
</script>
