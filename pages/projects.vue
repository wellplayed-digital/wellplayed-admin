<template>
  <WpContainer>
    <div class="d-flex justify-space-between pb-6">
      <div class="d-flex align-center">
        <h1 class="text-h4 mr-6">
          Projects
        </h1>
        <WpChip :color="showDeleted ? 'error' : 'default'" @click="toogleDeleted">
          Show Deleted
        </WpChip>
      </div>
      <div>
        <ProjectsOrderDialog :projects="projects">
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
      <v-col v-for="project in projects" :key="project.id" lg="3">
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
const showDeleted = ref(false)
const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('deleted', showDeleted.value)
      .order('order', { ascending: true })
    if (error) { throw error }
    projects.value = data
    disabled.value = false
  } catch (error) {
    snackbar.error({ text: error.message })
  }
}
onMounted(fetchProjects)
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
