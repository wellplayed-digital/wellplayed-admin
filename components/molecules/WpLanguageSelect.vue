<template>
  <v-menu location="bottom center">
    <template #activator="{props: slotProps}">
      <WpIconButton v-bind="slotProps" :tooltip-text="$t('global.language')">
        <WpFlag :country-code="currentLocale.countryCode" />
      </WpIconButton>
    </template>
    <v-list>
      <v-list-item
        v-for="locale in locales"
        :key="`locale-${locale.code}`"
        :active="locale.code === currentLocaleCode"
        @click="changeLocale(locale.code)"
      >
        <div class="d-flex align-center text-body-2">
          <WpFlag :country-code="locale.countryCode" />
          <span class="ml-2">{{ locale.name }}</span>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
const { locale: currentLocaleCode, locales } = useI18n()
const router = useRouter()
const switchLocalePath = useSwitchLocalePath()
const currentLocale = computed(() => locales.value.find(locale => locale.code === currentLocaleCode.value))
const changeLocale = (locale) => {
  const path = switchLocalePath(locale)
  router.push({ path })
}
</script>
