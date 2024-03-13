<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
  >
    <template #activator="{props: slotProps}">
      <WpTextField
        :model-value="guestsText"
        :label="capitalize($t('global.guests', 2))"
        readonly
        hide-details
        :prepend-inner-icon="guestsIcon"
        class="wp-cursor-pointer"
        v-bind="slotProps"
      />
    </template>
    <WpCard class="w-100 pa-2 mb-4">
      <v-card-text>
        <WpCounterField
          v-model="guestsCount.adults"
          :min="1"
          :max="guestsLimit.adults"
          :label="capitalize($t('global.adults', 2))"
          hide-details
          class="mb-4"
        />
        <WpCounterField
          v-model="guestsCount.children"
          :min="0"
          :max="guestsLimit.children"
          :label="capitalize($t('global.children', 2))"
          hide-details
        />
        <WpTransition :show="guestsTotal >= MAX_GUESTS">
          <div class="text-medium-emphasis text-body-2 mt-4">
            {{ $t('errors.maxGuests') }}
          </div>
        </WpTransition>
      </v-card-text>
    </WpCard>
  </v-menu>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { capitalize } from 'lodash'

const { t } = useI18n()
const props = defineProps({
  modelValue: { type: Object, default: null }
})
const emits = defineEmits(['update:modelValue', 'close'])
const show = ref(false)
const MAX_GUESTS = ref(6)
const guestsCount = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
const guestsTotal = computed(() => guestsCount.value.adults + guestsCount.value.children)
const guestsLimit = computed(() => ({
  adults: MAX_GUESTS.value - guestsCount.value.children,
  children: MAX_GUESTS.value - guestsCount.value.adults
}))
const guestsText = computed(() => {
  const adults = `${guestsCount.value.adults} ${t('global.adults', guestsCount.value.adults)}`
  if (!guestsCount.value.children) { return adults }
  const children = ` ${t('global.and')} ${guestsCount.value.children} ${t('global.children', guestsCount.value.children)}`
  return adults + children
})
const ICON_PER_GUESTS = ['mdi-account', 'mdi-account-multiple']
const guestsIcon = computed(() => ICON_PER_GUESTS[guestsTotal.value - 1] || 'mdi-account-group')
</script>
