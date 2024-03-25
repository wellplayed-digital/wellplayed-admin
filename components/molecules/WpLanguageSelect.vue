<template>
  <v-menu>
    <template #activator="{props: slotProps}">
      <WpIconButton v-bind="slotProps" :tooltip-text="$t('global.language')">
        <WpFlag :country-code="languages[locale].countryCode" />
      </WpIconButton>
    </template>
    <v-list>
      <v-list-item
        v-for="(availableLocale, index) in availableLocales"
        :key="`availableLocale-${index}`"
        :active="locale === availableLocale"
        @click="locale = availableLocale"
      >
        <div class="d-flex align-center">
          <WpFlag :country-code="languages[availableLocale].countryCode" />
          <div class="text-body-2 ml-2">
            {{ languages[availableLocale].name }}
          </div>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale, availableLocales } = useI18n()
const languages = ref({
  en: { name: 'English', countryCode: 'us' },
  es: { name: 'Español', countryCode: 'ar' }
})
</script>
