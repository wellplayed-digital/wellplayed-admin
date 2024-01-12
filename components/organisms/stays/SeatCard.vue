<template>
  <WpCard
    :variant="featured ? 'outlined' : ''"
    :color="featured ? 'amber' : null"
    @click="startCheckout"
  >
    <v-row>
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
        <v-card-text>
          <v-row
            v-for="(detail, detailIndex) in staysDetails"
            :key="`detail${detailIndex}`"
          >
            <v-col>
              <div class="text-medium-emphasis text-body-2 mr-2">
                {{ detail.title }}
              </div>
            </v-col>
            <v-col>
              <div class="text-white text-body-1">
                {{ detail.getValue(stay[detail.key]) }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </WpCard>
</template>

<script setup>
const { ISOtoFormat } = useDates()
const { plural } = useHelpers()
defineProps({
  stay: { type: Object, required: true },
  featured: { type: Boolean, default: false }
})
const staysDetails = ref([
  {
    title: 'Fecha de Llegada',
    key: 'startDate',
    getValue: value => ISOtoFormat(value)
  },
  {
    title: 'Fecha de Salida',
    key: 'endDate',
    getValue: value => ISOtoFormat(value)
  },
  {
    title: 'Estadia',
    key: 'nights',
    getValue: value => `${value} ${plural('noche', value)}`
  },
  {
    title: 'Costo por Noche',
    key: 'costPerNight',
    getValue: value => value + ' USD'
  },
  {
    title: 'Costo total',
    key: 'costTotal',
    getValue: value => value + ' USD'
  }
])
</script>
