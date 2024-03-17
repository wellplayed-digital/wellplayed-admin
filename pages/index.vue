<template>
  <div class="h-100 d-flex align-end">
    <WpBackground class="wp-z-index-1">
      <WpSwiper
        :slides="slides"
        class="wp-overlay"
        :class="{'wp-overlay-50': !globalStore.galleryMode}"
      >
        <template #default="slide">
          <v-img :src="slide.imgSrc" cover />
        </template>
      </WpSwiper>
    </WpBackground>
    <div class="wp-z-index-2 w-100">
      <WpTransition :show="!globalStore.galleryMode">
        <div class="wp-bg-glass py-6">
          <WpContainer>
            <h1 class="text-h5 text-center mb-8">
              <!-- ¿Cuando deseas viajar? -->
              {{ $t('pages.index.title') }}
            </h1>
            <CabinSearchForm @submit="searchCabin" />
          </WpContainer>
        </div>
      </WpTransition>
    </div>
  </div>
</template>

<script setup>
const globalStore = useGlobalStore()
const slides = ref([
  { key: 'slide-1', imgSrc: '/img/1.jpg' },
  { key: 'slide-2', imgSrc: '/img/2.jpg' },
  { key: 'slide-3', imgSrc: '/img/3.jpg' },
  { key: 'slide-4', imgSrc: '/img/4.jpg' },
  { key: 'slide-5', imgSrc: '/img/5.jpg' }
])
const searchCabin = (data) => {
  navigateTo('/cabin-search')
  console.log(data)
}
</script>
