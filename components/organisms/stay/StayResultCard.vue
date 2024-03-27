<template>
  <WpCard>
    <v-card-text class="px-6">
      <div>
        <div class="wp-font-brand text-h5 mb-3">
          {{ result.cabin.name }}
        </div>
        <div class="flex-grow-1">
          <div class="d-flex align-center">
            <div class="text-body-1 text-medium-emphasis">
              {{ $t('components.stayResultCard.capacity') }}
            </div>
            <div class="mx-1">
              <v-icon
                v-for="index in result.cabin.capacity"
                :key="`result-${result.id}-capacity-${index}`"
              >
                mdi-account
              </v-icon>
            </div>
            <div class="text-body-1">
              ({{ result.cabin.capacity }})
            </div>
          </div>
        </div>
      </div>
      <WpPrice
        :base-price="result.price_details.base_total_price"
        :final-price="result.price_details.final_total_price"
        :discount="result.price_details.discount"
      />
    </v-card-text>
  </WpCard>
</template>

<script setup>
defineProps({
  result: { type: Object, required: true }
})
</script>
