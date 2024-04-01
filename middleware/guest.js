export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  const localePath = useLocalePath()

  if (userStore.user) {
    return navigateTo(localePath('/'))
  }
})
