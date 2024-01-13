// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  vite: {
    vue: {
      template: { transformAssetUrls }
    }
  },
  build: {
    transpile: ['vuetify']
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    'nuxt-swiper'
  ],
  components: [
    { path: '~/components', prefix: '', pathPrefix: false }
  ],
  pinia: {
    storesDirs: ['./stores/**']
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '~/styles/main.scss'
  ]
})
