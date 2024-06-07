import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Database, Tables } from '~/types/supabase'

export const useUserStore = defineStore('user', () => {
  const snackbar = useSnackbar()
  const supabase = useSupabaseClient<Database>()

  const user = useSupabaseUser()
  const profile: Ref<Tables<'profiles'> | null> = ref(null)
  const logginIn = ref(false)
  const updatingProfile = ref(false)
  const signingOut = ref(false)

  const reset = () => {
    user.value = null
    profile.value = null
  }

  const fetchProfile = async () => {
    try {
      if (!user.value) { return }
      const { data, error } = await supabase.from('profiles').select('*').single()
      if (error) { throw error }
      profile.value = data
    } catch {
      //! Nuxt error when trying to invoke useT or useSnackbar
      reset()
    }
  }

  const updateProfile = async (firstName: string, lastName: string) => {
    if (!user.value) { return }
    try {
      updatingProfile.value = true
      const { error } = await supabase.from('profiles').upsert({
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date().toUTCString()
      })
      if (error) { throw error }
      snackbar.success({ text: 'Your profile has been updated successfully' })
    } catch {
      snackbar.error({ text: 'There was an error updating your profile' })
    } finally {
      await fetchProfile()
      updatingProfile.value = false
    }
  }

  const login = async (email: string) => {
    try {
      logginIn.value = true
      const { error } = await (supabase.auth as any).signInWithOtp({ email })
      if (error) { throw error }
      snackbar.success({ text: 'We sent an access link to your email' })
      navigateTo('/')
    } catch {
      snackbar.error({ text: 'There was an error sending the access link' })
    } finally {
      logginIn.value = false
    }
  }

  const signOut = async () => {
    try {
      signingOut.value = true
      const { error } = await (supabase.auth as any).signOut()
      if (error) { throw error }
      navigateTo('/')
      reset()
    } catch {
      snackbar.error({ text: 'There was an error logging out' })
    } finally {
      signingOut.value = false
    }
  }

  return {
    user,
    profile,
    logginIn,
    updatingProfile,
    signingOut,
    fetchProfile,
    login,
    updateProfile,
    signOut
  }
})
