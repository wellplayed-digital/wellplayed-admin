<template>
  <WpAsyncDialog title="Create Section" :confirm-function="save">
    <template #activator="slotAttrs">
      <slot v-bind="slotAttrs" name="activator" />
    </template>
    <template #default>
      <WpTextField v-model="section.title" label="Title" :rules="[required]" />
      <WpTextField v-model="section.description" label="Description" hide-details />
    </template>
  </WpAsyncDialog>
</template>

<script setup>
const { required } = useRules()
const section = ref({
  title: null,
  description: null
})
const save = () => {
  console.log('save')
}
</script>
