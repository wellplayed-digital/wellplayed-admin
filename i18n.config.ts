// import { useLocalStorage } from '@vueuse/core'
import { en as vuetifyEn, es as vuetifyEs } from 'vuetify/locale'
import esEs from '~/locales/es-ES.json'
import enUS from '~/locales/en-US.json'

export default {
  legacy: false,
  messages: {
    'es-ES': {
      ...esEs,
      $vuetify: {
        ...vuetifyEs,
        dataIterator: {
          rowsPerPageText: 'Items por página:',
          pageText: '{0}-{1} of {2}'
        }
      }
    },
    'en-US': {
      ...enUS,
      $vuetify: {
        ...vuetifyEn,
        dataIterator: {
          rowsPerPageText: 'Items per page:',
          pageText: '{0}-{1} of {2}'
        }
      }
    }
  }
}
