<template>
  <WpContainer>
    <div class="d-flex justify-space-between pb-6">
      <div class="d-flex align-center">
        <h1 class="text-h4 mr-6">
          Projects
        </h1>
        <v-chip-group v-model="activeStatusFiltersIndex" column multiple mandatory>
          <WpChip
            v-for="filter in statusFilters"
            :key="filter.key"
            :text="filter.text"
            :color="filter.color"
            filter
          />
        </v-chip-group>
      </div>
      <div>
        <ProjectsOrderDialog :projects="projects" @confirm="fetchProjects">
          <template #activator="{ props: slotProps }">
            <WpButton v-bind="slotProps" size="large" variant="tonal" class="mr-2" :disabled="loading">
              Change Order
            </WpButton>
          </template>
        </ProjectsOrderDialog>
        <WpButton size="large" to="/project/create" :disabled="loading">
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
const loading = ref(false)
const projects = ref([])
const statusFilters = ref([
  { key: 'published', text: 'Published', color: 'success' },
  { key: 'draft', text: 'Draft', color: 'info' },
  { key: 'deleted', text: 'Deleted', color: 'error' }
])
const activeStatusFiltersIndex = ref([])
const activeStatusFilters = computed(() => statusFilters.value
  .filter((_, index) => activeStatusFiltersIndex.value.includes(index))
  .map(filter => filter.key))
const filteredProjects = computed(() => projects.value.filter((project) => {
  if (activeStatusFilters.value.includes(project.status)) { return true }
  return false
}))
const fetchProjects = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: false })
      .order('created_at', { ascending: false })
    if (error) { throw error }
    projects.value = data
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    loading.value = false
  }
}
onMounted(async () => {
  await fetchProjects()
  activeStatusFiltersIndex.value = [0, 1]
})

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
