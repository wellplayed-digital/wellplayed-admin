<template>
  <v-menu
    v-model="show"
    origin="overlap"
    :close-on-content-click="false"
  >
    <template #activator="{props: slotProps}">
      <WpTextField
        :model-value="formattedDate"
        :label="label"
        readonly
        :rules="rules"
        v-bind="slotProps"
      />
    </template>
    <v-date-picker
      v-model="date"
      v-bind="$attrs"
      class="w-100"
      :title="label"
      header="Selecciona"
      @update:model-value="show = false"
    />
  </v-menu>
</template>

<script setup>
const { ISOtoJS, JStoISO, JStoFormat } = useDates()
const props = defineProps({
  modelValue: { type: String, default: null },
  label: { type: String, default: 'Date' },
  rules: { type: Array, default: () => [] }
})
const emits = defineEmits(['update:modelValue', 'close'])
const show = ref(false)
const date = computed({
  get: () => ISOtoJS(props.modelValue),
  set: value => emits('update:modelValue', JStoISO(value))
})
const formattedDate = computed(() => JStoFormat(date.value, { format: 'DATE_MED' }))
</script>
