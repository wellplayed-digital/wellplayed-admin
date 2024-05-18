<template>
  <ProjectCreateDialog edit :project="project">
    <template #activator="{props: slotProps}">
      <WpCard v-bind="slotProps">
        <v-card-text class="pt-6">
          <div class="d-flex align-center">
            <div v-if="project.title" class="text-h5 wp-ellipsis">
              {{ project.title }}
            </div>
            <div v-else class="text-h5 wp-ellipsis text-disabled">
              No title
            </div>
            <WpChip v-if="project.published" size="small" color="primary" class="ml-2">
              Published
            </WpChip>
          </div>
          <div>
            <div v-if="project.description" class="text-body-1 wp-ellipsis text-medium-emphasis">
              {{ project.description }}
            </div>
            <div v-else class="text-body-1 wp-ellipsis text-disabled">
              No description
            </div>
          </div>
          <div class="text-right text-disabled text-body-2 pt-4">
            {{ project.id }}
          </div>
        </v-card-text>
      </WpCard>
    </template>
  </ProjectCreateDialog>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true }
})
</script>
