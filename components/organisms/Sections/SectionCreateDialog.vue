<template>
  <WpAsyncDialog
    :title="section ? 'Update Section' : 'Create Section'"
    :confirm-function="confirm"
    width="40rem"
    @open="init"
  >
    <template #activator="slotAttrs">
      <slot v-bind="slotAttrs" name="activator" />
    </template>
    <template #default>
      <WpTextField v-model="title" label="Title" :rules="[required]" class="mb-4" />
      <WpTextarea v-model="description" label="Description" hide-details />
    </template>
  </WpAsyncDialog>
</template>

<script setup>
const supabase = useSupabaseClient()
const { required } = useRules()
const props = defineProps({
  projectId: { type: String, required: true },
  order: { type: Number, required: true },
  section: { type: Object, default: null }
})
const emits = defineEmits(['updated', 'created'])
const title = ref(null)
const description = ref(null)
const init = () => {
  if (props.section) {
    title.value = props.section.title
    description.value = props.section.description
  } else {
    title.value = null
    description.value = null
  }
}
const update = async () => {
  const { error } = await supabase.from('sections').update({
    title: title.value,
    description: description.value
  }).eq('id', props.section.id)
  if (error) { throw error }
  emits('updated')
}
const create = async () => {
  const { error } = await supabase.from('sections').insert([{
    project_id: props.projectId,
    order: props.order,
    title: title.value,
    description: description.value
  }])
  if (error) { throw error }
  emits('created')
}
const confirm = () => {
  props.section ? update() : create()
}
</script>
