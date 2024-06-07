<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h2 class="text-h6">
        Sections
      </h2>
      <div>
        <SectionsOrderDialog
          v-if="sections.length > 0"
          :sections="sections"
          @confirm="fetchSections"
        >
          <template #activator="{ props: slotProps }">
            <WpButton variant="tonal" class="mr-2" v-bind="slotProps">
              Change Order
            </WpButton>
          </template>
        </SectionsOrderDialog>
        <SectionCreateDialog
          :project-id="projectId"
          :order="sections.length"
          @created="fetchSections"
        >
          <template #activator="{ props: slotProps }">
            <WpButton v-bind="slotProps">
              Add section
            </WpButton>
          </template>
        </SectionCreateDialog>
      </div>
    </div>
    <WpCard v-for="section in sections" :key="section.id" class="my-4">
      <v-card-text>
        <div class="d-flex justify-space-between align-center">
          <div class="wp-ellipsis">
            <span class="text-body-1">
              {{ section.title }}
            </span>
            <span v-if="section.description" class="text-body-2 text-medium-emphasis ml-2">
              {{ section.description }}
            </span>
          </div>
          <div class="ml-2">
            <SectionCreateDialog
              :project-id="projectId"
              :order="section.order"
              :section="section"
              @updated="fetchSections"
            >
              <template #activator="{ props: slotProps }">
                <WpIconButton icon="mdi-pencil" tooltip-text="Edit" v-bind="slotProps" />
              </template>
            </SectionCreateDialog>
            <WpConfirmDialog
              text="Are you sure you want to delete this section?"
              color="error"
              confirm-text="Delete"
              @confirm="deleteSection(section.id)"
            >
              <template #activator="{ props: slotProps }">
                <WpIconButton icon="mdi-delete" tooltip-text="Delete" v-bind="slotProps" />
              </template>
            </WpConfirmDialog>
          </div>
        </div>
      </v-card-text>
    </WpCard>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const snackbar = useSnackbar()
const props = defineProps({
  projectId: { type: String, required: true }
})
const sections = ref([])
const fetchSections = async () => {
  try {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .eq('project_id', props.projectId)
      .order('order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error) { throw error }
    sections.value = data
  } catch {
    snackbar.error({ text: 'There was an error fetching the sections' })
  }
}
onMounted(fetchSections)
const deleteSection = async (id) => {
  try {
    const { error } = await supabase.from('sections').delete().eq('id', id)
    if (error) { throw error }
    snackbar.success({ text: 'The section has been deleted successfully' })
  } catch {
    snackbar.error({ text: 'There was an error deleting the section' })
  }
  await fetchSections()
}
</script>
