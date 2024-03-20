<template>
  <WpCard @click="startCheckout">
    <v-row no-gutters>
      <v-col cols="6">
        <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
          cover
        />
      </v-col>
      <v-col cols="6">
        <v-card-text class="text-white">
          <div class="text-h6 mb-4">
            {{ cabin.name }}
          </div>
          <div v-for="detail in details" :key="detail.key" class="text-body-1">
            <span>{{ detail.title }}: </span>
            <span>{{ detail.getValue(get(cabin, detail.key)) }}</span>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </WpCard>
</template>

<script setup>
import { get } from 'lodash'
defineProps({
  cabin: { type: Object, required: true }
})
const details = ref([
  {
    icon: 'mdi-account-group',
    title: 'Capacidad',
    key: 'capacity',
    getValue: value => value
  },
  {
    icon: 'mdi-currency-usd',
    title: 'Precio por noche',
    key: 'price_details.adjusted_price_per_night',
    getValue: value => value
  },
  {
    icon: 'mdi-currency-usd',
    title: 'Precio total',
    key: 'price_details.adjusted_total_price',
    getValue: value => value
  }
])
const startCheckout = () => {
  console.log('startCheckout')
}
</script>
