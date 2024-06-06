<template>
  <draggable
    v-model="items"
    item-key="id"
    @start="dragStart"
    @end="dragEnd"
  >
    <template #item="{ element }">
      <div
        class="py-1 wp-cursor-grab"
        :style="{ opacity: element.id === dragging?.id ? '0' : '1' }"
      >
        <slot name="item" v-bind="{ element }" />
      </div>
    </template>
  </draggable>
</template>

<script setup>
const items = defineModel({ type: Array, required: true })
const emits = defineEmits(['drag-end'])
const dragging = ref(null)
const dragStart = (element) => {
  const originalOrder = items.value.length - element.oldIndex
  dragging.value = items.value.find(project => project.order === originalOrder)
}
const dragEnd = () => {
  dragging.value = null
  emits('drag-end')
}
</script>
