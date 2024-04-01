import { render } from 'vue'
import Snackbar from '~/components/organisms/Snackbar.vue'

export default () => {
  const log = ({ text, color }: {
    text: string,
    color?: 'info' | 'error' | 'warning' | 'success'
  }) => {
    let componentInstance: any = null
    const nuxtApp = useNuxtApp()
    const mountEl = document.createElement('div')
    document.body.appendChild(mountEl)
    const snackbarComponent = h(Snackbar, {
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

  const info = ({ text }: { text: string }) => {
    log({ text })
  }

  const error = ({ text }: { text: string }) => {
    log({ text, color: 'error' })
  }

  const warning = ({ text }: { text: string }) => {
    log({ text, color: 'warning' })
  }

  const success = ({ text }: { text: string }) => {
    log({ text, color: 'success' })
  }

  return {
    info,
    error,
    warning,
    success
  }
}
