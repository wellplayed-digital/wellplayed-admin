<template>
  <WpContainer>
    <h1 class="text-h5 text-center mb-8">
      {{ $t('pages.index.title') }}
    </h1>
  </WpContainer>
</template>

<script setup>
definePageMeta({
  title: 'pages.index.headTitle'
})
const route = useRoute()
const userStore = useUserStore()
const { t } = useI18n()
const snackbar = useSnackbar()
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
