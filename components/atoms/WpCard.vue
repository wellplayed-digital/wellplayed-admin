<template>
  <v-card elevation="4" :class="{'wp-card--glass': glass}">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-card>
</template>

<script setup>
defineProps({
  glass: { type: Boolean, default: false }
})
</script>

<style>
.wp-card--glass {
  /* From https://css.glass */
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9.7px);
  -webkit-backdrop-filter: blur(9.7px);
}
</style>
