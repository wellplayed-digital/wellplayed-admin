<template>
  <WpContainer>
    <CabinSearchForm :disabled="loading" watch-query @submit="searchCabin" />
    <CabinResultsList :loading="loading" :cabins="cabins" />
  </WpContainer>
</template>

<script setup>
useHead({ title: 'Busqueda' })
const route = useRoute()
const supabase = useSupabaseClient()
const snackbar = useSnackbar()
const cabins = ref([])
const loading = ref(false)
const searchCabin = async ({ startDate, endDate, guests }) => {
  try {
    loading.value = true
    const { data, error } = await supabase.rpc('get_available_cabins', {
      start_date: startDate,
      end_date: endDate,
      guests
    })
    if (error) { throw error }
    cabins.value = data
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  if (route.query.startDate && route.query.endDate && route.query.guests) {
    searchCabin(route.query)
  }
})
</script>
