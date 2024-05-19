<template>
  <NavbarDesktop :links="visibleLinks" />
</template>

<script setup>
const userStore = useUserStore()
const links = computed(() => [
  {
    key: 'projects',
    text: 'Projects',
    to: '/projects',
    visible: !!userStore.user
  },
  {
    key: 'login',
    text: 'Login',
    to: '/login',
    visible: !userStore.user
  },
  {
    key: 'profile',
    text: 'My Profile',
    to: '/profile',
    visible: !!userStore.user
  }
])
const visibleLinks = computed(() => links.value.filter(link => link.visible))
</script>
