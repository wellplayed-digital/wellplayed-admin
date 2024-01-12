<template>
  <v-menu
    v-model="show"
    origin="overlap"
    :close-on-content-click="false"
  >
    <template #activator="{props: slotProps}">
      <WpTextField
        :model-value="formattedGuestCount"
        label="Huespedes"
        readonly
        hide-details
        v-bind="slotProps"
      />
    </template>
    <v-card>
      <template #text>
        <WpCounterField
          v-model="count.adults"
          :min="1"
          :max="max.adults"
          label="Adultos"
          hide-details
          class="mb-4"
        />
        <WpCounterField
          v-model="count.children"
          :min="0"
          :max="max.children"
          label="Niños"
          hide-details
        />
        <div v-if="MAX_TOTAL === max.adults + max.children" class="text-error text-body-2 mt-2">
          Máximo de huespedes alcanzado
        </div>
      </template>
    </v-card>
  </v-menu>
</template>

<script setup>
const { plural } = useHelpers()
const props = defineProps({
  modelValue: { type: Object, default: null }
})
const emits = defineEmits(['update:modelValue', 'close'])
const show = ref(false)
const count = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
const MAX_TOTAL = ref(6)
const max = computed(() => {
  return {
    adults: MAX_TOTAL.value - count.value.children,
    children: MAX_TOTAL.value - count.value.adults
  }
})
const formattedGuestCount = computed(() => {
  const adults = `${count.value.adults} ${plural('adulto', count.value.adults)}`
  if (!count.value.children) { return adults }
  const children = ` y ${count.value.children} ${plural('niño', count.value.children)}`
  return adults + children
})
</script>
