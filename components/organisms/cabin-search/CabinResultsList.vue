<template>
  <v-row class="py-10">
    <v-col v-for="(cabin, index) in cabins" :key="cabin.id" cols="12" md="6">
      <CabinResultCard :cabin="cabin" :featured="index === 0" />
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  cabins: { type: Array, required: true }
})
</script>
