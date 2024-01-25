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
      <v-col cols="5" class="text-end">
        <WpButton
          v-for="link in menuRightEnabled"
          :key="link.key"
          size="small"
          variant="text"
          class="ml-4"
          :to="link.to"
          @click="link.click"
        >
          {{ link.text }}
        </WpButton>
      </v-col>
    </v-row>
  </WpContainer>
</template>

<script setup>
const globalStore = useGlobalStore()
const userStore = useUserStore()
const route = useRoute()
const menuLeft = ref([
  {
    key: 'search',
    text: 'Busqueda',
    to: '/stays-search'
  },
  {
    key: 'gallery',
    text: 'Galeria',
    click: async () => {
      globalStore.galleryMode = route.path !== '/' || !globalStore.galleryMode
      await navigateTo('/')
    }
  }
])
const menuRight = computed(() => [
  {
    key: 'login',
    text: 'Iniciar Sesión',
    to: '/auth/login',
    disabled: !!userStore.user
  },
  {
    key: 'profile',
    text: 'Perfil',
    to: '/auth/profile',
    disabled: !userStore.user
  }
])
const menuRightEnabled = computed(() => menuRight.value.filter(link => !link.disabled))
</script>
