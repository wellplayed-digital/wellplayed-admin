<template>
  <v-img :src="imgSrc" height="100%" cover class="wp-pointer-events-none wp-user-select-none" />
</template>

<script setup>
defineProps({
  imgSrc: { type: String, default: '' }
})
</script>
