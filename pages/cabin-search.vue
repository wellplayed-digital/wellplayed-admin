<template>
  <WpContainer>
    <CabinSearchForm @submit="searchCabin" />
    <!-- <CabinResultsList /> -->
  </WpContainer>
</template>

<script setup>
useHead({ title: 'Busqueda' })

const cabins = ref([])

const searchCabin = async (data) => {
  console.log(data)
  try {
    const { data, error } = await supabase.rpc('check_cabin_availability', {
      input_start_date: '2024-04-10',
      input_end_date: '2024-04-11',
      guests_total: 3
    })
    if (error) { throw error }
    cabins.value = data
  } catch (error) {
    snackbar.error({ text: error.message })
  }
}
</script>
