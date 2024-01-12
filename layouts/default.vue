<template>
  <v-app>
    <v-app-bar
      color="primary"
      density="compact"
    >
      <template #prepend>
        <v-app-bar-nav-icon />
      </template>

      <v-app-bar-title>Ayrampo</v-app-bar-title>

      <template #append>
        <v-btn icon="mdi-dots-vertical" />
      </template>
    </v-app-bar>
    <slot />
  </v-app>
</template>
