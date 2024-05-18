<template>
  <WpContainer>
    <h1 class="text-h5 text-center mb-8">
      {{ $t('pages.index.title') }}
    </h1>
    <div class="d-flex justify-end pb-6">
      <ProjectCreateDialog>
        <template #activator="{props: slotProps}">
          <WpButton v-bind="slotProps" size="large">
            Create Project
          </WpButton>
        </template>
      </ProjectCreateDialog>
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
  title: 'pages.index.headTitle'
})
const route = useRoute()
const userStore = useUserStore()
const projectsStore = useProjectsStore()
const { t } = useI18n()
const snackbar = useSnackbar()
onMounted(async () => {
  await projectsStore.fetchProjects()
  // Check if comes from magic link
  if (route.query.error === 'unauthorized_client') {
    snackbar.error({ text: t('pages.index.invalidLinkError') })
    return
  }
  if (route.query.code && userStore.user) {
    const userName = userStore.profile?.first_name || userStore.user.email
    snackbar.success({ text: t('pages.index.welcomeSuccess', { name: userName }) })
  }
})
</script>
