// https://nuxt.com/docs/api/configuration/nuxt-config

import colors from 'vuetify/util/colors'

export default defineNuxtConfig({
  runtimeConfig: {
    mercadopagoAccessToken: '',
    mercadopagoWebhookSecret: '',
    public: {
      enviroment: '',
      baseUrl: '',
      mercadopagoKey: ''
    }
  },
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'vuetify-nuxt-module',
    'nuxt-swiper',
    '@nuxtjs/supabase'
  ],
  pinia: {
    storesDirs: ['./stores/**']
  },
  i18n: {
    vueI18n: './i18n.config.ts'
    // locales: [
    //   {
    //     code: 'en',
    //     iso: 'en-US',
    //     file: 'en.json',
    //     name: 'English',
    //     dir: 'ltr'
    //   },
    //   {
    //     code: 'es',
    //     iso: 'es-ES',
    //     file: 'es.json',
    //     name: 'Español',
    //     dir: 'ltr'
    //   }
    // ],
    // lazy: true,
    // strategy: 'no_prefix',
    // detectBrowserLanguage: false,
    // langDir: './locales',
    // defaultLocale: 'en',
    // types: 'composition',
    // pages: undefined,
    // dynamicRouteParams: false,
    // skipSettingLocaleOnNavigate: true,
  },
  vuetify: {
    vuetifyOptions: {
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
    }
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/'
    }
  },
  // Autoimport components
  components: [
    { path: '~/components', prefix: '', pathPrefix: false }
  ],
  css: [
    // Vuetify & Icons
    // 'vuetify/styles',
    // '@mdi/font/css/materialdesignicons.css',

    // Custom SCSS: Overrides / Utilities
    '~/styles/main.scss'
  ],
  app: {
    head: {
      titleTemplate: 'Ayrampo | %s',
      title: 'Home'
    }
  }
})
