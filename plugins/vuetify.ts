import { useLocalStorage } from '@vueuse/core'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'
import { en as vuetifyEn, es as vuetifyEs } from 'vuetify/locale'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import en from '~/locales/en.json'
import es from '~/locales/es.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const storedLocale = useLocalStorage('locale', 'en')

  const messages = {
    en: {
      ...en,
      $vuetify: {
        ...vuetifyEn,
        dataIterator: {
          rowsPerPageText: 'Items per page:',
          pageText: '{0}-{1} of {2}'
        }
      }
    },
    es: {
      ...es,
      $vuetify: {
        ...vuetifyEs,
        dataIterator: {
          rowsPerPageText: 'Items por página:',
          pageText: '{0}-{1} of {2}'
        }
      }
    }
  }

  const i18n = createI18n({
    legacy: false, // Vuetify does not support the legacy mode of vue-i18n
    locale: storedLocale.value,
    fallbackLocale: 'en',
    messages
  })

  const vuetify = createVuetify({
    locale: {
      adapter: createVueI18nAdapter({ i18n, useI18n })
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            primary: colors.amber.base
          }
        },
        light: {
          colors: {
            primary: colors.amber.base
          }
        }
      }
    }
  })
  vueApp.use(i18n)
  vueApp.use(vuetify)
})
