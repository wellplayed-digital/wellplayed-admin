<template>
  <WpAsyncDialog
    width="600"
    :confirm-function="bookStay"
    @confirm="redirectToPayment"
  >
    <template #activator="slotAttrs">
      <slot name="activator" v-bind="slotAttrs" />
    </template>
    <template #default>
      <h3 class="text-h4">
        Booking Confirmation
      </h3>
      <p class="text-h6 text-medium-emphasis mb-4">
        Do you want to book this cabin?
      </p>
      <div class="border pa-2">
        <v-row dense>
          <v-col sm="6">
            <div
              v-for="(leftDetail, index) in leftDetails"
              :key="`leftDetail-${index}`"
            >
              <div class="text-body-1">
                <span class="text-medium-emphasis mr-2">
                  {{ leftDetail.title }}
                </span>
                <strong>{{ leftDetail.value }}</strong>
              </div>
            </div>
          </v-col>
          <v-col sm="6">
            <div
              v-for="(rightDetail, index) in rightDetails"
              :key="`rightDetail-${index}`"
            >
              <div class="text-body-1">
                <span class="text-medium-emphasis mr-2">
                  {{ rightDetail.title }}
                </span>
                <strong>{{ rightDetail.value }}</strong>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </template>
  </WpAsyncDialog>
</template>

<script setup>
const userStore = useUserStore()
const currencyStore = useCurrencyStore()
const { ISOtoFormat } = useDates()
const props = defineProps({
  result: { type: Object, required: true }
})
const leftDetails = computed(() => [
  {
    title: 'Check In',
    value: ISOtoFormat(props.result.stay_start_date)
  },
  {
    title: 'Check Out',
    value: ISOtoFormat(props.result.stay_end_date)
  },
  {
    title: 'Nights',
    value: props.result.price_details.total_nights
  },
  {
    title: 'Guests',
    value: props.result.stay_guests
  }
])
const pricePerNight = computed(() => {
  return currencyStore.getPrice(props.result.price_details.final_price_per_night)
})
const totalPrice = computed(() => {
  return currencyStore.getPrice(props.result.price_details.final_total_price)
})
const rightDetails = computed(() => [
  {
    title: 'Cabin',
    value: props.result.cabin.name
  },
  {
    title: 'Capacity',
    value: props.result.cabin.capacity
  },
  {
    title: 'Price per night',
    value: `${pricePerNight.value} ${currencyStore.userCurrency.code}`
  },
  {
    title: 'Total price',
    value: `${totalPrice.value} ${currencyStore.userCurrency.code}`
  }
])

const bookStay = () => useFetch('/api/book-stay', {
  method: 'POST',
  body: {
    payment_method: 'mercadopago',
    cabin_id: props.result.cabin.id,
    start_date: props.result.stay_start_date,
    end_date: props.result.stay_end_date,
    guests: props.result.stay_guests,
    access_token: userStore.session.access_token,
    refresh_token: userStore.session.refresh_token
  }
}).then(({ data, error }) => ({
  data: data?.value,
  error: error?.value?.data
}))
const redirectToPayment = ({ url }) => {
  window.location.href = url
}
</script>
