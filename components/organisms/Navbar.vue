<template>
  <WpContainer class="py-10 wp-z-index-10">
    <v-row align="center">
      <v-col cols="5">
        <WpButton
          v-for="link in menuLeft"
          :key="link.key"
          size="small"
          variant="text"
          class="mr-4"
          :to="link.to"
          @click="link.click"
        >
          {{ link.text }}
        </WpButton>
      </v-col>
      <v-col cols="2" class="text-center">
        <WpBrandLogo to="/" @click="globalStore.galleryMode = false" />
      </v-col>
      <v-col cols="5" class="d-flex justify-end align-center">
        <WpButton
          v-for="link in menuRightEnabled"
          :key="link.key"
          variant="text"
          size="small"
          class="mr-4"
          :to="link.to"
          @click="link.click"
        >
          {{ link.text }}
        </WpButton>
        <WpLanguageSelect />
      </v-col>
    </v-row>
  </WpContainer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const globalStore = useGlobalStore()
const userStore = useUserStore()
const route = useRoute()
const menuLeft = computed(() => [
  {
    key: 'search',
    text: t('navbar.search'),
    to: '/cabin-search'
  },
  {
    key: 'gallery',
    text: t('navbar.gallery'),
    click: async () => {
      globalStore.galleryMode = route.path !== '/' || !globalStore.galleryMode
      await navigateTo('/')
    }
  },
  {
    key: 'supabase',
    text: 'Supabase',
    to: '/supabase'
  }
])
const menuRight = computed(() => [
  {
    key: 'login',
    text: t('global.login'),
    to: '/auth/login',
    disabled: !!userStore.user
  },
  {
    key: 'profile',
    text: t('navbar.profile'),
    to: '/auth/profile',
    disabled: !userStore.user
  }
])
const menuRightEnabled = computed(() => menuRight.value.filter(link => !link.disabled))
</script>
