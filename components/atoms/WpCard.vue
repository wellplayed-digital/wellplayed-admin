<template>
  <v-card elevation="4">
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-card>
</template>
