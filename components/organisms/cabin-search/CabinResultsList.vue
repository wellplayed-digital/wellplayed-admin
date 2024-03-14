<template>
  <div class="py-10">
    <WpLoader v-if="loading" text="Loading Cabins" />
    <v-row v-else>
      <v-col v-for="(cabin, index) in cabins" :key="cabin.id" cols="12" md="6">
        <CabinResultCard :cabin="cabin" :featured="index === 0" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, required: true },
  cabins: { type: Array, required: true }
})
</script>
