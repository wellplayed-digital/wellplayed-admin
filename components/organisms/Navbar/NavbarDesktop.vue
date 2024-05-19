<template>
  <WpContainer>
    <div class="py-4">
      <v-row align="center">
        <v-col cols="6">
          <WpBrandLogo to="/" />
        </v-col>
        <v-col cols="6" class="d-flex justify-end align-center">
          <WpButton
            v-for="link in links"
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
defineProps({
  links: { type: Array, required: true }
})
</script>
