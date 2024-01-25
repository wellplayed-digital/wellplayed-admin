import { render } from 'vue'
import AppSnackbar from '~/components/organisms/AppSnackbar.vue'

export default () => {
  const log = ({ text, color }) => {
    let componentInstance = null
    const nuxtApp = useNuxtApp()
    const mountEl = document.createElement('div')
    document.body.appendChild(mountEl)
    const snackbarComponent = h(AppSnackbar, {
      onDestroy: () => {
        const parent = componentInstance?.$el?.parentNode
        render(null, parent)
        parent?.parentNode?.removeChild(parent)
      }
    })
    snackbarComponent.appContext = nuxtApp.vueApp._context
    render(snackbarComponent, mountEl)
    componentInstance = snackbarComponent.component?.proxy
    const snackbar = snackbarComponent.component?.exposed
    snackbar?.log({ text, color })
  }

  const info = ({ text }) => {
    log({ text })
  }

  const error = ({ text }) => {
    log({ text, color: 'error' })
  }

  const warning = ({ text }) => {
    log({ text, color: 'warning' })
  }

  const success = ({ text }) => {
    log({ text, color: 'success' })
  }

  return {
    info,
    error,
    warning,
    success
  }
}
