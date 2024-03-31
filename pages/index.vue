<template>
  <WpPage>
    <template #background>
      <WpSwiper name="home" :slides="slides" class="h-100">
        <template #default="slide">
          <v-img :src="slide.imgSrc" height="100%" cover />
        </template>
      </WpSwiper>
    </template>
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
            :results="results"
            :loading="loading"
            class="mt-10"
          />
        </WpTransition>
      </WpContainer>
    </div>
  </WpPage>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'

const supabase = useSupabaseClient()
const snackbar = useSnackbar()
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
const startDate = ref(useLocalStorage('startDate', null))
const endDate = ref(useLocalStorage('endDate', null))
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
    firstSearch.value = true
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    loading.value = false
  }
}
</script>
