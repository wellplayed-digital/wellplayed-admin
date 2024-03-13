<template>
  <WpContainer>
    <CabinSearchForm @submit="searchCabin" />
    <CabinResultsList :cabins="cabins" />
  </WpContainer>
</template>

<script setup>

useHead({ title: 'Busqueda' })

const supabase = useSupabaseClient()
const snackbar = useSnackbar()

const cabins = ref([])
const loading = ref(false)
const searchCabin = async ({ startDate, endDate, guests }) => {
  try {
    loading.value = true
    const { data, error } = await supabase.rpc('check_cabin_availability', {
      input_start_date: startDate,
      input_end_date: endDate,
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
</script>
