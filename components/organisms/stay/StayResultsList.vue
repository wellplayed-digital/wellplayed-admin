<template>
  <div class="py-10">
    <v-row dense>
      <v-col
        v-for="(result, index) in results"
        :key="`result-${index}`"
        cols="12"
        sm="6"
        lg="3"
      >
        <CheckoutDialog
          :start-date="startDate"
          :end-date="endDate"
          :guests="guests"
          :result="result"
        >
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
  </div>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  guests: { type: Number, required: true },
  results: { type: Array, required: true }
})
</script>
