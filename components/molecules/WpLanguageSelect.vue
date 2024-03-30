<template>
  <v-menu location="bottom center">
    <template #activator="{props: slotProps}">
      <WpIconButton v-bind="slotProps" :tooltip-text="$t('global.language')">
        <WpFlag :country-code="languageStore.userLanguage.countryCode" />
      </WpIconButton>
    </template>
    <v-list>
      <v-list-item
        v-for="language in languageStore.availableLanguages"
        :key="`language-${language.locale}`"
        :active="languageStore.userLanguage.locale === language.locale"
        @click="languageStore.userLanguage = language"
      >
        <div class="d-flex align-center text-body-2">
          <WpFlag :country-code="language.countryCode" />
          <span class="ml-2">{{ language.name }}</span>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
const languageStore = useLanguageStore()
</script>
