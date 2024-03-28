<template>
  <NuxtLink class="wp-link" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<style scoped lang="scss">
.wp-link {
  position: relative;
  color: inherit;
  text-decoration: none;
  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    border-bottom: 2px dotted currentColor;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
  }
  &:hover::before {
    opacity: 1;
  }
}
</style>
