<template>
  <div class="py-10">
    <!-- <WpLoader v-if="loading" text="Loading Results" /> -->
    <v-row>
      <v-col v-for="result in results" :key="result.cabin.id" cols="12" md="6">
        <StaySearchResultCard :result="result" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, required: true },
  results: { type: Array, required: true }
})
</script>
