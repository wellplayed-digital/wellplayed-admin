<template>
  <WpContainer>
    <v-row>
      <v-col v-for="(stay, index) in stays" :key="stay.id" cols="12" md="6">
        <SeatCard
          :stay="stay"
          :featured="index === 0"
          @click="startCheckout"
        />
      </v-col>
    </v-row>
  </WpContainer>
</template>

<script setup>
const stays = ref([
  {
    id: 1,
    startDate: '2024-01-20',
    endDate: '2024-01-25',
    nights: 1,
    costPerNight: 100,
    costTotal: 500
  },
  {
    id: 2,
    startDate: '2024-01-22',
    endDate: '2024-01-27',
    nights: 5,
    costPerNight: 150,
    costTotal: 500
  },
  {
    id: 3,
    startDate: '2024-01-22',
    endDate: '2024-01-27',
    nights: 5,
    costPerNight: 150,
    costTotal: 500
  },
  {
    id: 4,
    startDate: '2024-01-22',
    endDate: '2024-01-27',
    nights: 5,
    costPerNight: 150,
    costTotal: 500
  }
])
const startCheckout = () => {
  console.log('startCheckout')
}
</script>
