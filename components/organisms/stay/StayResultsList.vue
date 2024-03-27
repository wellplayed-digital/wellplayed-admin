<template>
  <v-row dense>
    <v-col
      v-for="result in results"
      :key="`result-${result.id}`"
      cols="12"
      sm="6"
      lg="3"
    >
      <CheckoutDialog :result="result">
        <template #activator="{ props: slotProps }">
          <StayResultCard :result="result" v-bind="slotProps" />
        </template>
      </CheckoutDialog>
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, required: true },
  results: { type: Array, required: true }
})
</script>
