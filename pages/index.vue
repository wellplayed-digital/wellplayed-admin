<template>
  <WpPage>
    <template #background>
      <WpSwiper name="home" :slides="slides" class="h-100">
        <template #default="slide">
          <v-img :src="slide.imgSrc" height="100%" cover />
        </template>
      </WpSwiper>
    </template>
    <WpBgGlass class="py-6">
      <WpContainer>
        <h1 class="text-h5 text-center mb-8">
          {{ $t('pages.index.title') }}
        </h1>
        <StayForm
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
    </WpBgGlass>
  </WpPage>
</template>

<script setup>
definePageMeta({
  title: 'pages.index.headTitle'
})
const route = useRoute()
const userStore = useUserStore()
const { t } = useI18n()
const snackbar = useSnackbar()
const supabase = useSupabaseClient()
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
const searchStay = async ({ startDate, endDate, guests }) => {
  try {
    loading.value = true
    const { data, error } = await supabase.rpc('search_stay', {
      start_date: startDate,
      end_date: endDate,
      guests
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
onMounted(() => {
  // Check if comes from magic link
  if (route.query.error === 'unauthorized_client') {
    snackbar.error({ text: t('pages.index.invalidLinkError') })
    return
  }
  if (route.query.code && userStore.user) {
    const userName = userStore.profile?.first_name || userStore.user.email
    snackbar.success({ text: t('pages.index.welcomeSuccess', { name: userName }) })
  }
})
</script>
