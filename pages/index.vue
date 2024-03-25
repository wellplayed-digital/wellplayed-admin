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
              {{ $t('pages.index.title') }}
            </h1>
            <StayForm
              v-model:start-date="startDate"
              v-model:end-date="endDate"
              v-model:guests="guests"
              :loading="loading"
              @submit="searchStay"
            />
            <WpTransition :show="firstSearch">
              <StayResultsList
                :loading="loading"
                :start-date="startDate"
                :end-date="endDate"
                :guests="guests"
                :results="results"
              />
            </WpTransition>
          </WpContainer>
        </div>
      </WpTransition>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'

const supabase = useSupabaseClient()
const snackbar = useSnackbar()
const globalStore = useGlobalStore()
const slides = ref([
  { key: 'slide-1', imgSrc: '/img/1.jpg' },
  { key: 'slide-2', imgSrc: '/img/2.jpg' },
  { key: 'slide-3', imgSrc: '/img/3.jpg' },
  { key: 'slide-4', imgSrc: '/img/4.jpg' },
  { key: 'slide-5', imgSrc: '/img/5.jpg' }
])
const results = ref([])
const loading = ref(false)
const firstSearch = ref(false)
const startDate = ref(useLocalStorage('startDate'))
const endDate = ref(useLocalStorage('endDate'))
const guests = ref(useLocalStorage('guests', 1))
const searchStay = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.rpc('search_stay', {
      start_date: startDate.value,
      end_date: endDate.value,
      guests: guests.value
    })
    if (error) { throw error }
    results.value = data
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    firstSearch.value = true
    loading.value = false
  }
}
</script>
