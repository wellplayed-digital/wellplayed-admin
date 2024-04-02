<template>
  <div class="wp-bg-glass">
    <div class="wp-bg-glass__background" />
    <div class="wp-bg-glass__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wp-bg-glass {
  position: relative;
  &__background {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    mask-image: linear-gradient(to bottom, rgba(black, 0), rgba(black, 1), rgba(black, 1));
    backdrop-filter: blur(6px);
  }
  &__content {
    position: relative;
    z-index: 2;
  }
}
</style>
