<template>
  <WpDialog width="600" :confirm-function="startPayment" @confirm="test">
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
            <div v-for="(leftDetail, index) in leftDetails" :key="`leftDetail-${index}`">
              <div class="text-body-1">
                <span class="text-medium-emphasis mr-2">
                  {{ leftDetail.title }}
                </span>
                <strong>{{ leftDetail.value }}</strong>
              </div>
            </div>
          </v-col>
          <v-col sm="6">
            <div v-for="(rightDetail, index) in rightDetails" :key="`rightDetail-${index}`">
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
  </WpDialog>
</template>

<script setup>
const { ISOtoFormat } = useDates()
const { USD } = useCurrency()
const props = defineProps({
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  guests: { type: Number, required: true },
  result: { type: Object, required: true }
})
const leftDetails = ref([
  { title: 'Check In', value: ISOtoFormat(props.startDate) },
  { title: 'Check Out', value: ISOtoFormat(props.endDate) },
  { title: 'Nights', value: props.result.price_details.total_nights },
  { title: 'Guests', value: props.guests }
])
const rightDetails = ref([
  { title: 'Cabin', value: props.result.cabin.name },
  { title: 'Price per night', value: `${USD(props.result.price_details.final_price_per_night)} USD` },
  { title: 'Total price', value: `${USD(props.result.price_details.final_total_price)} USD` }
])
const startPayment = () => {
  return useFetch('/api/create-order', {
    method: 'POST',
    body: {
      product_name: 'Nuxt Course',
      price: 100,
      payment_method: 'mercadopago'
    }
  })
}
const test = (response) => {
  console.log(response)
}

// const pay = async () => {
//   const response = await useFetch('/api/create-order', {
//     method: 'POST',
//     body: {
//       product_name: 'Nuxt Course',
//       price: 100,
//       payment_method: 'mercadopago'
//     }
//   })

//   pending.value = false

//   if (response.url) {
//     window.location.href = response.url
//   } else {
//     alert('Something went wrong')
//   }
// }
</script>
