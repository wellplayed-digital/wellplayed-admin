<template>
  <WpBgGlass class="wp-z-index-10">
    <WpContainer>
      <NavbarDesktop :left-links="visibleLeftLinks" :right-links="visibleRightLinks" />
    </WpContainer>
  </WpBgGlass>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const localePath = useLocalePath()
const userStore = useUserStore()
const leftLinks = computed(() => [
  // {
  //   key: 'book',
  //   text: t('components.navbar.book'),
  //   to: localePath('/'),
  //   visible: true
  // },
  // {
  //   key: 'aboutUs',
  //   text: t('components.navbar.aboutUs'),
  //   to: null,
  //   visible: true
  // },
  // {
  //   key: 'gallery',
  //   text: t('components.navbar.gallery'),
  //   to: null,
  //   visible: true
  // }
])
const visibleLeftLinks = computed(() => leftLinks.value.filter(link => link.visible))
const rightLinks = computed(() => [
  {
    key: 'login',
    text: t('global.login'),
    to: localePath('/login'),
    visible: !userStore.user
  },
  {
    key: 'profile',
    text: t('components.navbar.profile'),
    to: localePath('/profile'),
    visible: !!userStore.user
  }
])
const visibleRightLinks = computed(() => rightLinks.value.filter(link => link.visible))
</script>
