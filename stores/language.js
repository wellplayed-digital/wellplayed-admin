// TODO: solve hydration issue (ssr not the same as client)

import { useLocalStorage } from '@vueuse/core'

export const useLanguageStore = defineStore('language', () => {
  const { locale, availableLocales } = useI18n()

  const LANGUAGES = {
    'es-ES': { locale: 'es-ES', name: 'Español', countryCode: 'ar' },
    'en-US': { locale: 'en-US', name: 'English', countryCode: 'us' }
  }

  const availableLanguages = computed(() => {
    return Object.keys(LANGUAGES).reduce((acc, key) => {
      if (!availableLocales.includes(key)) {
        return acc
      }
      acc[key] = LANGUAGES[key]
      return acc
    }, {})
  })

  const userLanguage = ref(useLocalStorage('userLanguage', availableLanguages.value[locale.value]))
  watch(userLanguage, () => { locale.value = userLanguage.value.locale })

  return {
    availableLanguages,
    userLanguage
  }
})
