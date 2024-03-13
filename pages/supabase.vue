<template>
  <WpContainer>
    <div class="mb-4">
      <div>Cabins:</div>
      <div v-for="cabin in cabins" :key="`cabin-${cabin.id}`">
        {{ cabin }}
      </div>
    </div>
    <div class="mb-4">
      <div>Bookings:</div>
      <div v-for="booking in bookings" :key="`booking-${booking.id}`">
        {{ booking }}
      </div>
    </div>
    <WpButton class="mb-4" @click="checkAvailability">
      Check availability
    </WpButton>
    <div class="mb-4">
      <div>Available Cabins:</div>
      <div v-for="availableCabin in availableCabins" :key="`availableCabin-${availableCabin.id}`">
        {{ availableCabin }}
      </div>
    </div>
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

const availableCabins = ref([])
const checkAvailability = async () => {
  try {
    const { data, error } = await supabase.rpc('check_cabin_availability', {
      input_start_date: '2024-04-10',
      input_end_date: '2024-04-11',
      guests_total: 3
    })
    if (error) { throw error }
    availableCabins.value = data
  } catch (error) {
    snackbar.error({ text: error.message })
  }
}
</script>
