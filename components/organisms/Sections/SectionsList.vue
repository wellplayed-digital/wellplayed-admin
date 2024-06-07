<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h2 class="text-h5 text-primary">
        Sections
      </h2>
      <div>
        <WpButton variant="tonal" class="mr-2">
          Change Order
        </WpButton>
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
      <v-card-text class="wp-pointer-events-none">
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
            <WpChip color="primary" size="small">
              Published
            </WpChip>
          </div>
        </div>
      </v-card-text>

      <!-- <SectionCard :section="section" /> -->
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
  } catch (error) {
    snackbar.error({ text: 'There was an error fetching the sections' })
  }
}
onMounted(fetchSections)
</script>
