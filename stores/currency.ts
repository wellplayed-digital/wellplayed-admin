import { defineStore } from 'pinia'
import { useIntervalFn } from '@vueuse/core'

export const useCurrencyStore = defineStore('currency', () => {
  const snackbar = useSnackbar()

  const availableCurrencies = ref([
    { code: 'ARS', name: 'Peso Argentino' },
    { code: 'USD', name: 'United States dollar' }
  ])
  const userCurrency = useCookie('currency', {
    default: () => availableCurrencies.value[0] // Default to ARS
  })
  const dollarPrice: Ref<number | null> = ref(null)

  const setDollarAsOnlyCurrency = () => {
    availableCurrencies.value = availableCurrencies.value.filter(currency => currency.code === 'USD')
    userCurrency.value = availableCurrencies.value[0]
  }

  const fetchDollarPrice = async () => {
    try {
      const { data, error, refresh } = await useFetch('/api/dollar')
      if (error.value) { throw new Error(error.value.data) }
      dollarPrice.value = data.value
      const SECONDS_IN_MS = 1000
      useIntervalFn(refresh, 60 * SECONDS_IN_MS)
    } catch (error) {
      //! Nuxt error when trying to invoke useT or useSnackbar
      dollarPrice.value = null
      setDollarAsOnlyCurrency()
    }
  }

  const formatPrice = (price: number, decimals = 2) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(price)

  const getPrice = (price: number) => {
    if (userCurrency.value.code === 'ARS') {
      if (!dollarPrice.value) {
        snackbar.error({ text: useT('stores.currency.dollarError') })
        return
      }
      return formatPrice(price * dollarPrice.value, 0)
    }
    return formatPrice(price)
  }

  return {
    availableCurrencies,
    userCurrency,
    dollarPrice,
    fetchDollarPrice,
    getPrice
  }
})
