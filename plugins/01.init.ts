export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const currencyStore = useCurrencyStore()
  await Promise.all([
    userStore.fetchProfile(),
    currencyStore.fetchDollarPrice()
  ])
})
