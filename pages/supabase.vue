<template>
  <WpContainer>
    <div class="d-flex align-center mb-4">
      <div class="mr-4">
        cabinId: {{ cabinId }}
      </div>
      <div class="mr-4">
        startDate: {{ startDate }}
      </div>
      <div class="mr-4">
        endDate: {{ endDate }}
      </div>
      <div class="mr-4">
        guests: {{ guests }}
      </div>
      <div>
        <WpButton @click="createBooking">
          Create Booking
        </WpButton>
      </div>
    </div>
    <v-row>
      <v-col v-for="booking in bookings" :key="`booking-${booking.id}`" cols="4">
        <WpCard>
          <v-card-text>
            <pre>
<code>
{{ JSON.stringify(booking, null, 4) }}
</code>
</pre>
          </v-card-text>
        </WpCard>
      </v-col>
    </v-row>
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

const cabinId = ref(4)
const guests = ref(2)
const startDate = ref('2024-04-22')
const endDate = ref('2024-04-23')
const createBooking = async () => {
  // try {
  //   const { error } = await supabase.rpc('book_cabin', {
  //     cabin_id: cabinId.value,
  //     start_date: startDate.value,
  //     end_date: endDate.value,
  //     guests: guests.value
  //   })
  //   if (error) { throw error }
  //   fetchData()
  // } catch (error) {
  //   snackbar.error({ text: error.message })
  // }
}
</script>
