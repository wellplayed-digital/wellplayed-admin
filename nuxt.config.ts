// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  build: {
    transpile: ['vuetify']
  },
  modules: [
    // Vite: Load vuetify module
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxtjs/supabase'
  ],
  // Module options
  vite: {
    vue: {
      template: { transformAssetUrls }
    }
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/',
      exclude: ['/cabin-search']
    }
  },
  // Autoimport components
  components: [
    { path: '~/components', prefix: '', pathPrefix: false }
  ],
  css: [
    // Vuetify & Icons
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
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
