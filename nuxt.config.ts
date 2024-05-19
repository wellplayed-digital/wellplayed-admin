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
    'vuetify-nuxt-module',
    'nuxt-swiper',
    '@nuxtjs/supabase'
  ],
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
