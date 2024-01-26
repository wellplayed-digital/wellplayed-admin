export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()
  const snackbar = useSnackbar()
  await userStore.fetchProfile()
  // Check if comes from magic link
  if (to.query.code && userStore.user) {
    const userName = userStore.profile.first_name || userStore.user.email
    snackbar.success({ text: `Bienvenido ${userName}` })
  }
})
