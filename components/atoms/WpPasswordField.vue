<template>
  <WpTextField
    v-bind="$attrs"
    :type="show ? 'text' : 'password'"
    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append-inner="show = !show"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </WpTextField>
</template>

<script setup>
const show = ref(false)
</script>
