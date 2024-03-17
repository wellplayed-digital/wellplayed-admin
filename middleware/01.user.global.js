export default defineNuxtRouteMiddleware(async (to) => {
  const { $i18n } = useNuxtApp()
  const userStore = useUserStore()
  const snackbar = useSnackbar()
  await userStore.fetchProfile()
  // Check if comes from magic link
  if (to.query.code && userStore.user) {
    const userName = userStore.profile.first_name || userStore.user.email
    snackbar.success({ text: $i18n.t('pages.index.welcome', { name: userName }) })
  }
  if (to.query.error === 'unauthorized_client') {
    snackbar.error({ text: $i18n.t('pages.index.invalidLink') })
  }
})
