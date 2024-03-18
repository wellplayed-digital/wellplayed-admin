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
    <div>
      <div>New Book:</div>
      <div>
        CabinId: {{ cabinId }}
      </div>
      <div>
        StartDate: {{ startDate }}
      </div>
      <div>
        EndDate: {{ endDate }},
      </div>
      <div>
        Guests: {{ guest }}
      </div>
      <WpButton @click="createBooking">
        Create Booking
      </WpButton>
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

const cabinId = ref(1)
const guests = ref(2)
const startDate = ref('2024-06-22')
const endDate = ref('2024-06-23')
const createBooking = async () => {
  try {
    const { error } = await supabase.rpc('book_cabin', {
      input_cabin_id: cabinId.value,
      input_start_date: startDate.value,
      input_end_date: endDate.value,
      input_guests: guests.value
    })
    if (error) { throw error }
    fetchData()
  } catch (error) {
    snackbar.error({ text: error.message })
  }
}
</script>
