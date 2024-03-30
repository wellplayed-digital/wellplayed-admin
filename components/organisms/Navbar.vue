<template>
  <WpContainer class="py-10 wp-z-index-10">
    <v-row align="center">
      <v-col cols="5">
        <WpButton
          v-for="link in visibleLeftLinks"
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
        <WpBrandLogo to="/" />
      </v-col>
      <v-col cols="5" class="d-flex justify-end align-center">
        <div class="mr-4">
          <WpButton
            v-for="link in visibleRightLinks"
            :key="link.key"
            variant="text"
            size="small"
            :to="link.to"
            @click="link.click"
          >
            {{ link.text }}
          </WpButton>
        </div>
        <div class="mr-4">
          <WpCurrencySelect />
        </div>
        <div>
          <WpLanguageSelect />
        </div>
      </v-col>
    </v-row>
  </WpContainer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userStore = useUserStore()
const leftLinks = computed(() => [
  {
    key: 'book',
    text: t('components.navbar.book'),
    to: '/',
    visible: true
  },
  {
    key: 'aboutUs',
    text: t('components.navbar.aboutUs'),
    to: null,
    visible: true
  },
  {
    key: 'gallery',
    text: t('components.navbar.gallery'),
    to: null,
    visible: true
  }
])
const visibleLeftLinks = computed(() => {
  return leftLinks.value.filter(link => link.visible)
})
const rightLinks = computed(() => [
  {
    key: 'login',
    text: t('global.login'),
    to: '/auth/login',
    visible: !userStore.user
  },
  {
    key: 'profile',
    text: t('components.navbar.profile'),
    to: '/auth/profile',
    visible: !!userStore.user
  }
])
const visibleRightLinks = computed(() => {
  return rightLinks.value.filter(link => link.visible)
})
</script>
