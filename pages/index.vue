<template>
  <div class="h-100 d-flex align-end">
    <WpBackground class="wp-z-index-1">
      <WpSwiper :slides="slides">
        <template #default="slide">
          <v-img
            class="wp-overlay"
            :class="{'wp-overlay-50': !global.galleryMode}"
            :src="slide.imgSrc"
            cover
          />
        </template>
      </WpSwiper>
    </WpBackground>
    <div class="wp-z-index-2 w-100">
      <WpTransition :show="!global.galleryMode">
        <div class="wp-bg-glass py-6">
          <WpContainer>
            <h1 class="text-h5 text-center mb-6">
              ¿Cuando deseas viajar?
            </h1>
            <StaysSearchForm @submit="navigateTo('/stays-search')" />
          </WpContainer>
        </div>
      </WpTransition>
    </div>
  </div>
</template>

<script setup>
const global = useGlobalStore()

const slides = ref([
  { key: 'slide-1', imgSrc: '/img/1.jpg' },
  { key: 'slide-2', imgSrc: '/img/2.jpg' },
  { key: 'slide-3', imgSrc: '/img/3.jpg' },
  { key: 'slide-4', imgSrc: '/img/4.jpg' },
  { key: 'slide-5', imgSrc: '/img/5.jpg' }
])
</script>
