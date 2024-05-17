<template>
  <div class="wp-loader-full" :class="{'wp-loader-full--hide': !loading}">
    <WpBrandISO loading :style="{ width: '10rem' }" />
  </div>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>
.wp-loader-full {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100dvw;
  width: 100vw;
  height: 100dvh;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s opacity 1s ease-in-out;
  &--hide {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
