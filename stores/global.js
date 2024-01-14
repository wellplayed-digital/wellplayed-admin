import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const galleryMode = ref(false)

  return {
    galleryMode
  }
})
