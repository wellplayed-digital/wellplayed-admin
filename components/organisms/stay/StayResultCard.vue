<template>
  <WpCard @click="startCheckout">
    <v-card-text class="px-6">
      <div>
        <div class="wp-font-brand text-h5 mb-3">
          {{ cabin.name }}
        </div>
        <div class="flex-grow-1">
          <div class="d-flex align-center">
            <div class="text-body-1 text-medium-emphasis">
              {{ $t('components.stayResultCard.capacity') }}
            </div>
            <div class="mx-1">
              <v-icon v-for="n in cabin.capacity" :key="`${cabin.id}-capacity-${n}`">
                mdi-account
              </v-icon>
            </div>
            <div class="text-body-1">
              ({{ cabin.capacity }})
            </div>
          </div>
        </div>
      </div>
      <WpPrice
        :base-price="priceDetails.base_total_price"
        :final-price="priceDetails.final_total_price"
        :discount="priceDetails.discount"
      />
    </v-card-text>
  </WpCard>
</template>

<script setup>
const props = defineProps({
  result: { type: Object, required: true }
})
const cabin = computed(() => props.result.cabin)
const priceDetails = computed(() => props.result.price_details)
const startCheckout = () => {
  console.log('startCheckout')
}
</script>
