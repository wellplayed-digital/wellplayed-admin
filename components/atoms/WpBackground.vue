<template>
  <div class="wp-background">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.wp-background {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
}
</style>
