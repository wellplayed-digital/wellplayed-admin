<template>
  <WpContainer>
    <StaySearchForm :disabled="loading" watch-query @submit="searchStay" />
    <StaySearchResultsList :loading="loading" :results="results" />
  </WpContainer>
</template>

<script setup>
useHead({ title: 'Busqueda' })
const route = useRoute()
const supabase = useSupabaseClient()
const snackbar = useSnackbar()
const results = ref([])
const loading = ref(false)
const searchStay = async () => {
  const { startDate, endDate, guests } = route.query
  try {
    loading.value = true
    const { data, error } = await supabase.rpc('search_stay', {
      start_date: startDate,
      end_date: endDate,
      guests
    })
    if (error) { throw error }
    results.value = data
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    loading.value = false
  }
}
</script>
