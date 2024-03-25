<template>
  <WpDialog width="800">
    <template #activator="slotAttrs">
      <slot name="activator" v-bind="slotAttrs" />
    </template>
    <v-row dense>
      <v-col
        v-for="(detail, index) in details"
        :key="`detail-${index}`"
        :cols="detail.cols || 12"
      >
        <div class="text-body-1">
          <span class="text-medium-emphasis mr-2">
            {{ detail.title }}
          </span>
          <strong>{{ detail.value }}</strong>
        </div>
      </v-col>
    </v-row>
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
const details = ref([
  { title: 'Check In', value: ISOtoFormat(props.startDate), cols: 4 },
  { title: 'Check Out', value: ISOtoFormat(props.endDate), cols: 4 },
  { title: 'Nights', value: props.result.price_details.total_nights, cols: 4 },
  { title: 'Guests', value: props.guests },
  { title: 'Cabin', value: props.result.cabin.name },
  { title: 'Price per night', value: `${USD(props.result.price_details.final_price_per_night)} USD`, cols: 4 },
  { title: 'Total price', value: `${USD(props.result.price_details.final_total_price)} USD`, cols: 4 }
])
</script>
