<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
    effect="fade"
    :slides-per-view="1"
    :loop="true"
    :autoplay="{ delay }"
    :pagination="pagination"
    v-bind="$attrs"
  >
    <SwiperSlide v-for="slide in slides" :key="slide.key" class="wp-swiper-slide">
      <slot v-bind="slide" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
defineProps({
  slides: { type: Array, required: true },
  delay: { type: Number, default: 2000 }
})
const pagination = ref({
  clickable: true,
  dynamicBullets: true,
  className: 'wp-swiper-pagination',
  renderBullet: (index, className) => {
    return `<div class="${className} wp-font-brand font-weight-bold">${index + 1}</div>`
  }
})
</script>

<style lang="scss" scoped>
:deep(.swiper-pagination) {
  --size: 5rem;
  left: 84.3% !important;
  top: 35% !important;
  bottom: unset !important;
  right: unset !important;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: rgba(black, 0.3);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
}
:deep(.swiper-pagination-bullet) {
  font-size: 2rem;
  width: var(--size);
  height: var(--size);
  background: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
:deep(.swiper-pagination-bullet-active-main) {
  opacity: 0.75;
}
</style>
