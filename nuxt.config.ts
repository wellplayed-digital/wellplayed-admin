// https://nuxt.com/docs/api/configuration/nuxt-config

// import colors from 'vuetify/util/colors'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      enviroment: '',
      baseUrl: ''
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
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    locales: [
      {
        code: 'es',
        iso: 'en-US',
        dir: 'ltr',
        name: 'Español',
        countryCode: 'ar'
      },
      {
        code: 'en',
        iso: 'en-US',
        dir: 'ltr',
        name: 'English',
        countryCode: 'us'
      }
    ],
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    vueI18n: './i18n.config.ts'
  },
  supabase: {
    redirect: false
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  vuetify: {
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {
              primary: '#764DF4',
              secondary: '#F42557'
            }
          }
        }
      }
    }
  },

  // Autoimport components
  components: [
    { path: '~/components', prefix: '', pathPrefix: false }
  ],
  css: ['~/styles/main.scss']
})
