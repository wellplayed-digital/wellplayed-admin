import { createVuetify } from 'vuetify'

import { es } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    locale: {
      locale: 'es',
      messages: { es }
    }
  })
  app.vueApp.use(vuetify)
})
