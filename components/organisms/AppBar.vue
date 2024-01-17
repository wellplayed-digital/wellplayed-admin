<template>
  <WpContainer class="py-10 z-index-10">
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
    key: 'gallery',
    text: 'Galeria',
    click: async () => {
      global.galleryMode = route.path !== '/' || !global.galleryMode
      await navigateTo('/')
    }
  },
  {
    key: 'search',
    text: 'Busqueda',
    to: '/stays-search'
  }
])
const menuRight = ref([
  {
    key: 'login',
    text: 'Iniciar Sesión',
    to: '/login'
  },
  {
    key: 'register',
    text: 'Registro',
    to: '/register'
  }
])
</script>
