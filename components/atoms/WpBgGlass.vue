<template>
  <div class="wp-bg-glass">
    <div class="wp-bg-glass__background" :class="{ 'wp-bg-glass__background--inverted': inverted }" />
    <div class="wp-bg-glass__content" :class="{ 'wp-bg-glass__content--inverted': inverted, [contentClass]: true }">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  contentClass: { type: String, default: '' },
  inverted: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>
.wp-bg-glass {
  position: relative;
  &__background {
    --opacity: 1;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    mask-image: linear-gradient(to top, rgba(black, 0), rgba(black, var(--opacity)), rgba(black, 1));
    &--inverted {
      mask-image: linear-gradient(to bottom, rgba(black, 0), rgba(black, var(--opacity)), rgba(black, 1));
    }
  }
  &__content {
    --opacity: 0.5;
    position: relative;
    z-index: 2;
    background: linear-gradient(to top, rgba(black, 0), rgba(black, 0) 50%, rgba(black, var(--opacity)));
    &--inverted {
      background: linear-gradient(to bottom, rgba(black, 0), rgba(black, 0) 50%, rgba(black, var(--opacity)));
    }
  }
}
</style>
