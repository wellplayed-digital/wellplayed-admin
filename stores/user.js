import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const supabase = useSupabaseClient()

  const user = useSupabaseUser()
  const profile = ref(null)

  const logginIn = ref(false)
  const fetchingProfile = ref(false)
  const updatingProfile = ref(false)
  const signingOut = ref(false)
  const loading = computed(() => logginIn.value || fetchingProfile.value || updatingProfile.value || signingOut.value)

  const login = async (email) => {
    if (loading.value) { return }
    try {
      logginIn.value = true
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) { throw error }
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      logginIn.value = false
    }
  }

  const fetchProfile = async () => {
    if (!user.value || loading.value) { return }
    try {
      fetchingProfile.value = true
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.value.id)
        .single()
      if (error) { throw error }
      profile.value = data
    } catch (error) {
      alert(error.message)
    } finally {
      fetchingProfile.value = false
    }
  }

  const updateProfile = async ({ firstName, lastName }) => {
    if (!user.value || loading.value) { return }
    try {
      updatingProfile.value = true
      const updates = {
        id: user.value.id,
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date()
      }
      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal' // Don't return the value after inserting
      })
      if (error) { throw error }
      fetchProfile()
    } catch (error) {
      alert(error.message)
    } finally {
      updatingProfile.value = false
    }
  }

  const signOut = async () => {
    if (!user.value || loading.value) { return }
    try {
      signingOut.value = true
      const { error } = await supabase.auth.signOut()
      if (error) { throw error }
      user.value = null
      profile.value = null
      navigateTo('/')
    } catch (error) {
      alert(error.message)
    } finally {
      signingOut.value = false
    }
  }

  return {
    user,
    profile,
    logginIn,
    fetchingProfile,
    updatingProfile,
    signingOut,
    loading,
    login,
    fetchProfile,
    updateProfile,
    signOut
  }
})
