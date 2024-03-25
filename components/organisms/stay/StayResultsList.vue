<template>
  <div class="py-10">
    <v-row dense>
      <v-col v-for="(result, index) in results" :key="`result-${index}`" cols="12" md="3">
        <StayResultCard :result="result" :result-index="index" />
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
