export default defineNuxtRouteMiddleware(async (to) => {
  // TODO: i18n not working
  // const { $i18n } = useNuxtApp()
  const userStore = useUserStore()
  const currencyStore = useCurrencyStore()
  const snackbar = useSnackbar()

  await Promise.all([
    userStore.fetchSession(),
    userStore.fetchProfile(),
    currencyStore.fetchDollarPrice()
  ])

  // Check if comes from magic link
  if (to.query.error === 'unauthorized_client') {
    // TODO: Replace with i18n
    snackbar.error({ text: 'The link is invalid or has expired' })
    return
  }
  if (to.query.code && userStore.user) {
    const userName = userStore.profile.first_name || userStore.user.email
    // TODO: Replace with i18n
    snackbar.success({ text: `Welcome ${userName}` })
  }
})
