<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectFade]"
    effect="fade"
    :speed="5000"
    :slides-per-view="1"
    :loop="true"
    :autoplay="{ delay: 5000 }"
    v-bind="$attrs"
  >
    <SwiperSlide v-for="(slide, index) in slides" :key="`swiper-${name}-slide-${index}`">
      <slot v-bind="slide" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  slides: { type: Array, required: true }
})
</script>
