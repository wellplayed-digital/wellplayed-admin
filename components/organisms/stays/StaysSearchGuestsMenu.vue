<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
  >
    <template #activator="{props: slotProps}">
      <WpTextField
        :model-value="guestText"
        label="Huespedes"
        readonly
        hide-details
        :prepend-inner-icon="guestIcon"
        class="cursor-pointer"
        v-bind="slotProps"
      />
    </template>
    <WpCard class="w-100 pa-2 mb-4">
      <v-card-text>
        <WpCounterField
          v-model="guestCount.adults"
          :min="1"
          :max="guestLimit.adults"
          label="Adultos"
          hide-details
          class="mb-4"
        />
        <WpCounterField
          v-model="guestCount.children"
          :min="0"
          :max="guestLimit.children"
          label="Niños"
          hide-details
        />
        <WpTransition :show="guestTotal >= MAX_GUEST">
          <div class="text-medium-emphasis text-body-2 mt-4">
            Ha alcanzado la cantidad máxima de huespedes
          </div>
        </WpTransition>
      </v-card-text>
    </WpCard>
  </v-menu>
</template>

<script setup>
const { plural } = useHelpers()
const props = defineProps({
  modelValue: { type: Object, default: null }
})
const emits = defineEmits(['update:modelValue', 'close'])
const show = ref(false)
const MAX_GUEST = ref(6)
const guestCount = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
const guestTotal = computed(() => guestCount.value.adults + guestCount.value.children)
const guestLimit = computed(() => ({
  adults: MAX_GUEST.value - guestCount.value.children,
  children: MAX_GUEST.value - guestCount.value.adults
}))
const guestIcon = computed(() => {
  if (guestTotal.value === 1) {
    return 'mdi-account'
  }
  if (guestTotal.value === 2) {
    return 'mdi-account-multiple'
  }
  return 'mdi-account-group'
})
const guestText = computed(() => {
  const adults = `${guestCount.value.adults} ${plural('adulto', guestCount.value.adults)}`
  if (!guestCount.value.children) { return adults }
  const children = ` y ${guestCount.value.children} ${plural('niño', guestCount.value.children)}`
  return adults + children
})
</script>
