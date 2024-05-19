<template>
  <NavbarDesktop :links="visibleLinks" />
</template>

<script setup>
const userStore = useUserStore()
const links = computed(() => [
  {
    key: 'login',
    text: 'Login',
    to: '/login',
    visible: !userStore.user
  },
  {
    key: 'profile',
    text: 'Profile',
    to: '/profile',
    visible: !!userStore.user
  }
])
const visibleLinks = computed(() => links.value.filter(link => link.visible))
</script>
