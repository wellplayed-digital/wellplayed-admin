<template>
  <WpContainer class="wp-z-index-10">
    <v-row align="center">
      <v-col cols="5">
        <WpButton
          v-for="link in leftLinks"
          :key="link.key"
          size="small"
          variant="text"
          class="mr-4"
          :to="link.to"
          @click="link.click"
        >
          {{ link.text }}
        </WpButton>
      </v-col>
      <v-col cols="2" class="text-center">
        <WpBrandLogo :to="localePath('/')" />
      </v-col>
      <v-col cols="5" class="d-flex justify-end align-center">
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
        <div class="mr-4">
          <CurrencySelect />
        </div>
        <div>
          <LanguageSelect />
        </div>
      </v-col>
    </v-row>
  </WpContainer>
</template>

<script setup>
const localePath = useLocalePath()
defineProps({
  leftLinks: { type: Array, required: true },
  rightLinks: { type: Array, required: true }
})
</script>
