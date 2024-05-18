<template>
  <WpContainer>
    <div class="py-4">
      <v-row align="center">
        <v-col cols="6">
          <WpBrandLogo :to="localePath('/')" />
        </v-col>
        <v-col cols="6" class="d-flex justify-end align-center">
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
        </v-col>
      </v-row>
    </div>
  </WpContainer>
</template>

<script setup>
const localePath = useLocalePath()
defineProps({
  rightLinks: { type: Array, required: true }
})
</script>
