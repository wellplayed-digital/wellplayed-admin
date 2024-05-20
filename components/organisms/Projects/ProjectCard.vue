<template>
  <WpCard :to="`/project/edit/${project.id}`">
    <v-card-text class="pt-6">
      <div class="text-h5 wp-ellipsis">
        {{ project.title }}
      </div>
      <p class="pb-4 text-body-1 wp-ellipsis text-medium-emphasis">
        {{ project.description || '&nbsp;' }}
      </p>
      <div class="d-flex align-center justify-space-between">
        <div class="text-body-2 text-disabled">
          {{ ISOtoFormat(project.published_at) }}
        </div>
        <WpChip v-if="project.status === 'published'" color="primary">
          Published
        </WpChip>
        <WpChip v-else-if="project.status === 'draft'" color="info">
          Draft
        </WpChip>
        <WpChip v-else-if="project.status === 'deleted'" color="error">
          Deleted
        </WpChip>
      </div>
    </v-card-text>
  </WpCard>
</template>

<script setup>
const { ISOtoFormat } = useDates()
defineProps({
  project: { type: Object, required: true }
})
</script>
