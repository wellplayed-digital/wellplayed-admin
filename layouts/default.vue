<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
    <Body>
      <v-app>
        <client-only>
          <Navbar />
        </client-only>
        <v-main>
          <NuxtPage />
        </v-main>
      </v-app>
    </Body>
  </Html>
</template>

<script setup>
const head = useLocaleHead({
  addDirAttribute: true, // Adds dir
  addSeoAttributes: true // Adds lang
})
const htmlAttrs = computed(() => head.value.htmlAttrs)
</script>
