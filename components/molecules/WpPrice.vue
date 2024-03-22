<template>
  <div>
    <div v-if="discount" class="text-disabled custom-line-through">
      <span class="text-h5 mr-1">{{ USD(basePrice) }}</span>
      <span class="text-body-1">USD</span>
    </div>
    <div class="text-primary">
      <span class="text-h4 mr-1">{{ USD(finalPrice) }}</span>
      <span class="text-body-1">USD</span>
    </div>
  </div>
</template>

<script setup>
const { USD } = useCurrency()
defineProps({
  basePrice: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  discount: { type: Boolean, default: false }
})
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
