<template>
  <v-switch v-bind="$attrs" inset>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-switch>
</template>
