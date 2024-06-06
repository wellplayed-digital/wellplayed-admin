<template>
  <div>
    <div class="d-flex justify-space-between align-center pb-4">
      <h2 class="text-h5 text-primary">
        Sections
      </h2>
      <div>
        <WpButton variant="tonal" class="mr-2">
          Change Order
        </WpButton>
        <SectionCreateDialog>
          <template #activator="{ props: slotProps }">
            <WpButton v-bind="slotProps">
              Add section
            </WpButton>
          </template>
        </SectionCreateDialog>
      </div>
    </div>
    <div v-for="section in sections" :key="section.id" class="mb-4">
      <SectionCard :section="section" />
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const projectId = route.params.id
const sections = ref([])
const fetchSections = async () => {
  try {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .eq('project_id', projectId)
      .order('order', { ascending: false })
      .order('created_at', { ascending: false })
    if (error) { throw error }
    sections.value = data
  } catch (error) {
    snackbar.error({ text: 'There was an error fetching the sections' })
  }
}
onMounted(fetchSections)
</script>
