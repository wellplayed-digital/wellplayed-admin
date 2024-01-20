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
        <WpBrandLogo to="/" @click="global.galleryMode = false" />
      </v-col>
      <v-col cols="5" class="text-end">
        <WpButton
          v-for="link in menuRight"
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
const global = useGlobalStore()
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
    to: '/',
    click: () => {
      global.galleryMode = route.path !== '/' || !global.galleryMode
    }
  }
])
const menuRight = ref([
  {
    key: 'login',
    text: 'Iniciar Sesión',
    to: '/auth/login'
  },
  {
    key: 'register',
    text: 'Registro',
    to: '/auth/register'
  },
  {
    key: 'profile',
    text: 'Perfil',
    to: '/auth/profile'
  }
])
</script>
