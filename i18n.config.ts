import { en as vuetifyEn, es as vuetifyEs } from 'vuetify/locale'
import es from '~/locales/es.json'
import en from '~/locales/en.json'

export default {
  legacy: false,
  messages: {
    es: {
      ...es,
      $vuetify: {
        ...vuetifyEs,
        dataIterator: {
          rowsPerPageText: 'Items por página:',
          pageText: '{0}-{1} of {2}'
        }
      }
    },
    en: {
      ...en,
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
