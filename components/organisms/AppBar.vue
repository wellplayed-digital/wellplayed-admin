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
          @click="link.click"
        >
          {{ link.text }}
        </WpButton>
      </v-col>
      <v-col cols="2" class="text-center">
        <span class="text-h4 text-brand cursor-pointer" @click="navigateToHome">
          Ayrampo
        </span>
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
const menuLeft = ref([
  {
    key: 'gallery',
    text: 'Galeria',
    click: async () => {
      await navigateTo('/')
    }
  },
  {
    key: 'search',
    text: 'Busqueda',
    click: async () => {
      await navigateTo('/stays-search')
    }
  }
])

const menuRight = ref([
  {
    key: 'login',
    text: 'Iniciar Sesión',
    click: async () => {
      await navigateTo('/login')
    }
  },
  {
    key: 'register',
    text: 'Registro',
    click: async () => {
      await navigateTo('/register')
    }
  }
])

const navigateToHome = async () => await navigateTo('/')

</script>
