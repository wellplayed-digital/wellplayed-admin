export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  await userStore.fetchProfile()
})
