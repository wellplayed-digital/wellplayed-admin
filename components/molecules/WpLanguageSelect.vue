<template>
  <v-menu>
    <template #activator="{props: slotProps}">
      <WpIconButton v-bind="slotProps" :tooltip-text="capitalize($t('global.language'))">
        <WpFlag :country-code="languages[locale].countryCode" />
      </WpIconButton>
    </template>
    <v-list>
      <v-list-item
        v-for="(option, index) in availableLocales"
        :key="index"
        :active="locale === option"
        @click="locale = option"
      >
        <div class="d-flex align-center">
          <WpFlag :country-code="languages[option].countryCode" />
          <div class="text-body-2 ml-2">
            {{ languages[option].name }}
          </div>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { capitalize } from 'lodash'
const { locale, availableLocales } = useI18n()
const languages = ref({
  en: { name: 'English', countryCode: 'us' },
  es: { name: 'Español', countryCode: 'ar' }
})
</script>
