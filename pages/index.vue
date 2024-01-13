<template>
  <div class="h-100">
    <WpBackground>
      <WpSwiper :slides="slides">
        <template #default="slide">
          <div class="h-screen w-screen">
            <v-img class="overlay-50" :src="slide.imgSrc" cover />
          </div>
        </template>
      </WpSwiper>
    </WpBackground>
    <div class="h-75 d-flex align-end z-index-2">
      <WpContainer>
        <WpCard glass>
          <v-card-text>
            <h1 class="text-h5 text-center mb-6">
              ¿Cuando deseas viajar?
            </h1>
            <StaysSearchForm @submit="navigateTo('/stays-search')" />
          </v-card-text>
        </WpCard>
      </WpContainer>
    </div>
  </div>
</template>

<script setup>
const slides = ref([
  { key: 1, imgSrc: '/img/1.jpg' },
  { key: 2, imgSrc: '/img/2.jpg' },
  { key: 3, imgSrc: '/img/3.jpg' },
  { key: 4, imgSrc: '/img/4.jpg' },
  { key: 5, imgSrc: '/img/5.jpg' }
])
</script>
