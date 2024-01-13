<template>
  <WpCard
    :variant="featured ? 'outlined' : 'elevated'"
    :color="featured ? 'amber' : null"
    @click="startCheckout"
  >
    <v-row no-gutters>
      <v-col cols="6">
        <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
          cover
        >
          <v-card-text v-if="featured">
            <v-chip variant="elevated" color="amber">
              <v-icon icon="mdi-star" />
              <div class="ml-1">
                Mejor opción
              </div>
            </v-chip>
          </v-card-text>
        </v-img>
      </v-col>
      <v-col cols="6">
        <v-card-text class="h-100 d-flex flex-column justify-space-between">
          <div class="">
            <v-row
              v-for="(detail, detailIndex) in staysDetails"
              :key="`detail${detailIndex}`"
            >
              <v-col class="d-flex align-center">
                <v-icon :icon="detail.icon" color="grey" />
                <div class="text-medium-emphasis text-body-2 mx-2">
                  {{ detail.title }}
                </div>
              </v-col>
              <v-col>
                <div class="text-white text-body-1">
                  {{ detail.getValue(stay[detail.key]) }}
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="text-end">
            <div class="">
              <span class="text-h3 text-bold">{{ stay.pricePerNight }}</span>
              <span class="text-h5 ml-1">USD</span>
            </div>
            <div>precio por noche</div>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </WpCard>
</template>

<script setup>
const { ISOtoFormat } = useDates()
const { plural } = useHelpers()
defineProps({
  stay: { type: Object, isRequired: true },
  featured: { type: Boolean, default: false }
})
const staysDetails = ref([
  {
    key: 'startDate',
    title: 'Fecha de Llegada',
    icon: 'mdi-calendar-start',
    getValue: value => ISOtoFormat(value)
  },
  {
    key: 'endDate',
    title: 'Fecha de Salida',
    icon: 'mdi-calendar-end',
    getValue: value => ISOtoFormat(value)
  },
  {
    key: 'nights',
    title: 'Estadia',
    icon: 'mdi-clock',
    getValue: value => `${value} ${plural('noche', value)}`
  }
  // {
  //   key: 'pricePerNight',
  //   title: 'priceo por Noche',
  //   getValue: value => value + ' USD'
  // },
  // {
  //   key: 'priceTotal',
  //   title: 'priceo total',
  //   getValue: value => value + ' USD'
  // }
])

const startCheckout = () => {
  console.log('startCheckout')
}
</script>
