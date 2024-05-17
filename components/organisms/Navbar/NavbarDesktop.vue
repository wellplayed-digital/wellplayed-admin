<template>
  <WpContainer class="wp-z-index-10">
    <v-row align="center">
      <v-col cols="6">
        <WpBrandLogo :to="localePath('/')" />
      </v-col>
      <v-col cols="6" class="d-flex justify-end align-center">
        <div class="mr-4">
          <WpButton
            v-for="link in rightLinks"
            :key="link.key"
            variant="text"
            size="small"
            :to="link.to"
            @click="link.click"
          >
            {{ link.text }}
          </WpButton>
        </div>
      </v-col>
    </v-row>
  </WpContainer>
</template>

<script setup>
const localePath = useLocalePath()
defineProps({
  rightLinks: { type: Array, required: true }
})
</script>
