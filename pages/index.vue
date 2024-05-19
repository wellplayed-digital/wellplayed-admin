<template>
  <WpContainer>
    <div class="d-flex justify-space-between pb-6">
      <h1 class="text-h4 text-center">
        Projects
      </h1>
      <div>
        <ProjectsOrderDialog v-if="ready" :projects="projectsStore.projects">
          <template #activator="{props: slotProps}">
            <WpButton v-bind="slotProps" size="large" variant="tonal" class="mr-2">
              Change Order
            </WpButton>
          </template>
        </ProjectsOrderDialog>
        <ProjectCreateDialog>
          <template #activator="{props: slotProps}">
            <WpButton v-bind="slotProps" size="large">
              New Project
            </WpButton>
          </template>
        </ProjectCreateDialog>
      </div>
    </div>
    <v-row>
      <v-col v-for="project in projectsStore.projects" :key="project.id" lg="3">
        <ProjectCard :project="project" />
      </v-col>
    </v-row>
  </WpContainer>
</template>

<script setup>
definePageMeta({
  title: 'Projects'
})
const route = useRoute()
const userStore = useUserStore()
const projectsStore = useProjectsStore()
const snackbar = useSnackbar()
const ready = ref(false)
onMounted(async () => {
  await projectsStore.fetchProjects()
  ready.value = true
  // Check if comes from magic link
  if (route.query.error === 'unauthorized_client') {
    snackbar.error({ text: 'The link is invalid or has expired' })
    return
  }
  if (route.query.code && userStore.user) {
    const userAlias = userStore.profile?.first_name || userStore.user.email
    snackbar.success({ text: `Welcome ${userAlias}` })
  }
})
</script>
