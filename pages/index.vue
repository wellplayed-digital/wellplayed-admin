<template>
  <div class="h-100 d-flex align-end">
    <WpBackground class="z-index-1 cursor-pointer" @click="galleryMode = !galleryMode">
      <WpSwiper :slides="slides">
        <template #default="slide">
          <div class="h-screen w-screen">
            <v-img
              class="overlay-50"
              :class="{'overlay-disabled': galleryMode}"
              :src="slide.imgSrc"
              cover
            />
          </div>
        </template>
      </WpSwiper>
    </WpBackground>
    <div class="z-index-2 w-100 bg-glass">
      <WpTransition :show="!galleryMode">
        <WpContainer>
          <h1 class="text-h5 text-center mb-6">
            ¿Cuando deseas viajar?
          </h1>
          <StaysSearchForm @submit="navigateTo('/stays-search')" />
        </WpContainer>
      </WpTransition>
    </div>
  </div>
</template>

<script setup>
const galleryMode = ref(false)
const slides = ref([
  { key: 'slide-1', imgSrc: '/img/1.jpg' },
  { key: 'slide-2', imgSrc: '/img/2.jpg' },
  { key: 'slide-3', imgSrc: '/img/3.jpg' },
  { key: 'slide-4', imgSrc: '/img/4.jpg' },
  { key: 'slide-5', imgSrc: '/img/5.jpg' }
])
</script>
