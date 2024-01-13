<template>
  <WpContainer>
    <v-row>
      <v-col v-for="(stay, index) in stays" :key="stay.id" cols="12" md="6">
        <StayCard :stay="stay" :featured="index === 0" />
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
    pricePerNight: 100,
    priceTotal: 500
  },
  {
    id: 2,
    startDate: '2024-01-22',
    endDate: '2024-01-27',
    nights: 5,
    pricePerNight: 150,
    priceTotal: 500
  },
  {
    id: 3,
    startDate: '2024-01-22',
    endDate: '2024-01-27',
    nights: 5,
    pricePerNight: 150,
    priceTotal: 500
  },
  {
    id: 4,
    startDate: '2024-01-22',
    endDate: '2024-01-27',
    nights: 5,
    pricePerNight: 150,
    priceTotal: 500
  }
])
</script>
