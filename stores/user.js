import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const snackbar = useSnackbar()
  const supabase = useSupabaseClient()

  const user = useSupabaseUser()
  const session = ref(null)
  const profile = ref(null)

  const logginIn = ref(false)
  const fetchingProfile = ref(false)
  const updatingProfile = ref(false)
  const signingOut = ref(false)

  const fetchSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) { throw error }
      session.value = data.session
    } catch (error) {
      snackbar.error({ text: error.message })
    }
  }

  const fetchProfile = async () => {
    if (!user.value) { return }
    try {
      fetchingProfile.value = true
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single()
      if (error) { throw error }
      profile.value = data
    } catch (error) {
      snackbar.error({ text: error.message })
    } finally {
      fetchingProfile.value = false
    }
  }

  const updateProfile = async ({ firstName, lastName }) => {
    if (!user.value) { return }
    try {
      updatingProfile.value = true
      const updates = {
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date()
      }
      const { error } = await supabase
        .from('profiles')
        .upsert(updates)
      if (error) { throw error }
      snackbar.success({ text: 'Tu perfil ha sido actualizado correctamente' })
    } catch (error) {
      snackbar.error({ text: error.message })
    } finally {
      await fetchProfile()
      updatingProfile.value = false
    }
  }

  const login = async (email) => {
    try {
      logginIn.value = true
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) { throw error }
      await Promise.all([
        fetchSession(),
        fetchProfile()
      ])
      // TODO: Replace with i18n (Busca el link de ingreso en tu casilla de correo)
      snackbar.success({ text: 'Check your email for the login link.' })
      navigateTo('/')
    } catch (error) {
      snackbar.error({ text: error.message })
    } finally {
      logginIn.value = false
    }
  }

  const reset = () => {
    session.value = null
    profile.value = null
  }

  const signOut = async () => {
    try {
      signingOut.value = true
      const { error } = await supabase.auth.signOut()
      if (error) { throw error }
      reset()
      navigateTo('/')
    } catch (error) {
      snackbar.error({ text: error.message })
    } finally {
      signingOut.value = false
    }
  }

  return {
    user,
    session,
    profile,
    logginIn,
    fetchingProfile,
    updatingProfile,
    signingOut,
    fetchProfile,
    fetchSession,
    login,
    updateProfile,
    signOut
  }
})
