<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <v-app>
        <Navbar />
        <v-main>
          <NuxtPage />
        </v-main>
        <WpLoaderFull :loading="loading" />
      </v-app>
    </Body>
  </Html>
</template>

<script setup>
const { t } = useI18n()
const route = useRoute()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})
const title = computed(() => `Wellplayed Admin | ${t(route.meta.title)}`)
const loading = ref(true)
onMounted(async () => {
  await nextTick()
  loading.value = false
})
</script>
