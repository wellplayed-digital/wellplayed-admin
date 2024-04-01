<template>
  <div class="d-flex flex-column align-end">
    <div v-if="discount" class="text-disabled custom-line-through">
      <span class="text-h5 mr-1">{{ getBasePrice }}</span>
      <span class="text-body-1">{{ currencyStore.userCurrency.code }}</span>
    </div>
    <div class="text-primary">
      <span class="text-h4 mr-1">{{ getFinalPrice }}</span>
      <span class="text-body-1">{{ currencyStore.userCurrency.code }}</span>
    </div>
  </div>
</template>

<script setup>
const currencyStore = useCurrencyStore()
const props = defineProps({
  basePrice: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  discount: { type: Boolean, default: false }
})
const getBasePrice = computed(() => currencyStore.getPrice(props.basePrice))
const getFinalPrice = computed(() => currencyStore.getPrice(props.finalPrice))
</script>

<style lang="scss" scoped>
.custom-line-through {
  display: inline-block;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: rgba(white, 0.8);
  }
}
</style>
