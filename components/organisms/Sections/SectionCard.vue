<template>
  <WpCard>
    <v-card-text>
      <div>
        <WpTextField v-model="sectionToEdit.title" label="Title" :rules="[required]" />
      </div>
      <div>
        <WpTextField v-model="sectionToEdit.description" label="Description" hide-details />
      </div>
    </v-card-text>
  </WpCard>
</template>

<script setup>
const { required } = useRules()
const props = defineProps({
  section: { type: Object, required: true }
})
const sectionToEdit = ref(props.section)

</script>
