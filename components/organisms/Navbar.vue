<template>
  <WpContainer class="py-10 wp-z-index-10">
    <v-row align="center">
      <v-col cols="5">
        <WpButton
          v-for="(linkLeft, index) in linksLeftEnabled"
          :key="`linkLeft-${index}`"
          size="small"
          variant="text"
          class="mr-4"
          :to="linkLeft.to"
          @click="linkLeft.click"
        >
          {{ linkLeft.text }}
        </WpButton>
      </v-col>
      <v-col cols="2" class="text-center">
        <WpBrandLogo to="/" />
      </v-col>
      <v-col cols="5" class="d-flex justify-end align-center">
        <WpButton
          v-for="(linkRight, index) in linksRightEnabled"
          :key="`linkRight-${index}`"
          variant="text"
          size="small"
          class="mr-4"
          :to="linkRight.to"
          @click="linkRight.click"
        >
          {{ linkRight.text }}
        </WpButton>
        <WpLanguageSelect />
      </v-col>
    </v-row>
  </WpContainer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userStore = useUserStore()
const linksLeft = computed(() => [
  {
    key: 'search',
    text: t('components.navbar.search'),
    to: '/'
  },
  {
    key: 'gallery',
    text: t('components.navbar.gallery'),
    to: null
  }
])
const linksLeftEnabled = computed(() => linksLeft.value.filter(link => !link.disabled))
const linksRight = computed(() => [
  {
    key: 'login',
    text: t('global.login'),
    to: '/auth/login',
    disabled: !!userStore.user
  },
  {
    key: 'profile',
    text: t('components.navbar.profile'),
    to: '/auth/profile',
    disabled: !userStore.user
  }
])
const linksRightEnabled = computed(() => linksRight.value.filter(link => !link.disabled))
</script>
