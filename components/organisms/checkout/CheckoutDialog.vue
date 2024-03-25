<template>
  <WpDialog width="800">
    <template #activator="slotAttrs">
      <slot name="activator" v-bind="slotAttrs" />
    </template>
    <div v-for="(detail, index) in details" :key="`detail-${index}`">
      {{ detail.title }}: {{ detail.value }}
    </div>
  </WpDialog>
</template>

<script setup>
const props = defineProps({
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  guests: { type: Number, required: true },
  result: { type: Object, required: true }
})
const details = ref([
  { title: 'Check-in', value: props.startDate },
  { title: 'Check-out', value: props.endDate },
  { title: 'Guests', value: props.guests },
  { title: 'Cabin', value: props.result.cabin.name },
  { title: 'Capacity', value: props.result.cabin.capacity },
  { title: 'Base price', value: props.result.price_details.base_total_price },
  { title: 'Final price', value: props.result.price_details.final_total_price }
])
</script>
