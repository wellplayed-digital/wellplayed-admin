<template>
  <v-row dense>
    <v-col
      v-for="(result, index) in results"
      :key="`result-${index}`"
      cols="12"
      sm="6"
      lg="3"
    >
      <CheckoutDialog :result="result">
        <template #activator="{ props: slotProps }">
          <StayResultCard
            :result="result"
            :result-index="index"
            v-bind="slotProps"
          />
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
