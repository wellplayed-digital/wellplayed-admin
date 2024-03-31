import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', () => {
  const availableCurrencies = ref({
    ars: { code: 'ARS', name: 'Peso Argentino' },
    usd: { code: 'USD', name: 'United States dollar' }
  })
  const userCurrency = ref(useLocalStorage('currency', availableCurrencies.value.ars))
  const dollarPrice = ref(null)

  const fetchDollarPrice = async () => {
    const data = await $fetch('/api/dollar')
    dollarPrice.value = data
  }

  const formatPrice = (price, decimals = 2) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(price)

  const getPrice = (price) => {
    if (userCurrency.value.code === 'ARS') {
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
