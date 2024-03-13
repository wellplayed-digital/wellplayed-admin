<template>
  <WpContainer>
    <div>Cabins: {{ cabins }}</div>
    <div>Bookins: {{ bookings }}</div>
    <WpButton @click="checkAvailability">
      Check availability
    </WpButton>
  </WpContainer>
</template>

<script setup>
const supabase = useSupabaseClient()
const snackbar = useSnackbar()

const cabins = ref([])
const bookings = ref([])
const loading = ref(false)
const fetchData = async () => {
  try {
    loading.value = true
    const { data: cabinsData, error: cabinsError } = await supabase.from('cabins').select('*')
    if (cabinsError) { throw cabinsError }
    cabins.value = cabinsData
    const { data: bookingsData, error: bookingsError } = await supabase.from('bookings').select('*')
    if (bookingsError) { throw bookingsError }
    bookings.value = bookingsData
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    loading.value = false
  }
}
onMounted(fetchData)

const checkAvailability = async () => {
  try {
    const { data, error } = await supabase.rpc('check_cabin_availability', {
      input_start_date: '2024-04-10',
      input_end_date: '2024-04-11',
      guests_total: 3
    })
    if (error) { throw error }
    console.log(data)
  } catch (error) {
    snackbar.error({ text: error.message })
  }
}
</script>
