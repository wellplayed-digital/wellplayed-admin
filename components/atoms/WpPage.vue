<template>
  <div class="wp-page">
    <div class="wp-page__background wp-overlay wp-overlay-50">
      <slot name="background" />
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.wp-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100vw;
  width: 100dvw;
  height: 100%;
  height: 100%;
  &__background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    width: 100dvw;
    height: 100vh;
    height: 100dvh;
  }
}
</style>
