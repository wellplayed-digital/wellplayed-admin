<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectCreative]"
    :slides-per-view="slidesPerView"
    :loop="true"
    :autoplay="{ delay }"
  >
    <SwiperSlide v-for="slide in slides" :key="slide.key">
      <slot v-bind="slide" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
defineProps({
  slides: { type: Array, required: true },
  slidesPerView: { type: Number, default: 1 },
  delay: { type: Number, default: 2000 }
})
</script>
