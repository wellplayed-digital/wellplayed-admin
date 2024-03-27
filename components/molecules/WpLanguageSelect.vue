<template>
  <v-menu>
    <template #activator="{props: slotProps}">
      <WpIconButton v-bind="slotProps" :tooltip-text="$t('global.language')">
        <WpFlag :country-code="languageStore.userLanguage.countryCode" />
      </WpIconButton>
    </template>
    <v-list>
      <v-list-item
        v-for="language in languageStore.availableLanguages"
        :key="`language-${language.code}`"
        :active="languageStore.userLanguage.code === language.code"
        @click="languageStore.userLanguage = language"
      >
        <div class="d-flex align-center">
          <WpFlag :country-code="language.countryCode" />
          <div class="text-body-2 ml-2">
            {{ language.name }}
          </div>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
const languageStore = useLanguageStore()
</script>
