import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Database, Tables } from '~/types/supabase'

export const useProjectsStore = defineStore('projects', () => {
  const snackbar = useSnackbar()
  const supabase = useSupabaseClient<Database>()

  const user = useSupabaseUser()
  const projects: Ref<Array<Tables<'projects'>>> = ref([])
  const loading = ref(false)

  const reset = () => {
    user.value = null
    projects.value = []
  }

  const fetchProjects = async () => {
    try {
      if (!user.value) { return }
      const { data, error } = await supabase.from('projects').select('*').order('order')
      if (error) { throw error }
      projects.value = data
    } catch (error) {
      //! Nuxt error when trying to invoke useT or useSnackbar
      reset()
    }
  }

  const updateProjectsOrder = async (projects: Array<{ id: number, order: number }>) => {
    try {
      if (!user.value) { return }
      const { error } = await supabase.rpc('update_projects_order', { projects })
      if (error) { throw error }
      await fetchProjects()
    } catch (error) {
      //! Nuxt error when trying to invoke useT or useSnackbar
      reset()
    }
  }

  const createProject = async (title: string, description: string, publishedAt: string, published: boolean) => {
    if (!user.value) { return }
    try {
      loading.value = true
      const { error } = await supabase.from('projects').insert({
        order: projects.value.length + 1,
        title,
        description,
        published_at: publishedAt,
        published
      })
      if (error) { throw error }
      snackbar.success({ text: 'The project has been created successfully' })
    } catch (error) {
      snackbar.error({ text: 'There was an error creating the project' })
      return { cancel: true }
    } finally {
      await fetchProjects()
      loading.value = false
    }
  }

  const updateProject = async (id: string, title: string, description: string, publishedAt: string, published: boolean) => {
    if (!user.value) { return }
    try {
      loading.value = true
      const { error } = await supabase.from('projects').update({
        updated_at: new Date().toUTCString(),
        title,
        description,
        published_at: publishedAt,
        published
      }).eq('id', id).select()
      if (error) { throw error }
      snackbar.success({ text: 'The project has been updated successfully' })
    } catch (error) {
      snackbar.error({ text: 'There was an error updating the project' })
      return { cancel: true }
    } finally {
      await fetchProjects()
      loading.value = false
    }
  }

  const deleteProject = async (id: string, callback: Function) => {
    if (!user.value) { return }
    try {
      loading.value = true
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) { throw error }
      snackbar.success({ text: 'The project has been deleted successfully' })
      callback()
    } catch (error) {
      snackbar.error({ text: 'There was an error deleting the project' })
    } finally {
      await fetchProjects()
      loading.value = false
    }
  }

  return {
    projects,
    loading,
    fetchProjects,
    updateProjectsOrder,
    createProject,
    updateProject,
    deleteProject
  }
})
