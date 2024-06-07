<template>
  <WpAsyncDialog
    title="Create Section"
    :confirm-function="create"
    width="40rem"
    @close="reset"
  >
    <template #activator="slotAttrs">
      <slot v-bind="slotAttrs" name="activator" />
    </template>
    <template #default>
      <WpTextField v-model="section.title" label="Title" :rules="[required]" class="mb-4" />
      <WpTextField v-model="section.description" label="Description" hide-details />
    </template>
  </WpAsyncDialog>
</template>

<script setup>
import { cloneDeep } from 'lodash'
const supabase = useSupabaseClient()
const { required } = useRules()
const props = defineProps({
  projectId: { type: String, required: true },
  order: { type: Number, required: true }
})
const emits = defineEmits(['created'])
const DEFAULT_SECTION = {
  project_id: props.projectId,
  order: props.order,
  title: null,
  description: null
}
const section = ref(cloneDeep(DEFAULT_SECTION))
const create = async () => {
  const { error } = await supabase.from('sections').insert([section.value])
  if (error) { throw error }
  emits('created')
}
const reset = () => {
  section.value = cloneDeep(DEFAULT_SECTION)
}
</script>
