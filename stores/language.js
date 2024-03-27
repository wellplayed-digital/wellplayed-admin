import { useI18n } from 'vue-i18n'

export const useLanguageStore = defineStore('language', () => {
  const { locale, availableLocales } = useI18n()

  const LANGUAGES = {
    es: { code: 'es', name: 'Español', countryCode: 'ar' },
    en: { code: 'en', name: 'English', countryCode: 'us' }
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

  const userLanguage = computed({
    get: () => availableLanguages.value[locale.value],
    set: (value) => {
      locale.value = value.code
    }
  })

  return {
    availableLanguages,
    userLanguage
  }
})