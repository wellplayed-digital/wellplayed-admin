<template>
  <WpForm @submit="submit">
    <v-row dense>
      <v-col cols="12" sm="6" md="3">
        <WpDatePicker
          v-model="startDate"
          :min="startLimit.min"
          :max="startLimit.max"
          label="Check In"
          prepend-inner-icon="mdi-calendar-start"
          hide-details
          @update:model-value="validateEndDate"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <WpDatePicker
          v-model="endDate"
          :min="endLimit.min"
          :max="endLimit.max"
          label="Check Out"
          prepend-inner-icon="mdi-calendar-end"
          hide-details
        >
          <template #append-inner>
            <v-icon icon="mdi-clock" size="small" color="primary" />
            <div class="text-body-2 text-primary px-1 text-no-wrap">
              {{ totalNights }} {{ $t('global.nights', totalNights) }}
            </div>
          </template>
        </WpDatePicker>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <CabinSearchGuestsMenu v-model="guests" />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <WpButton
          type="submit"
          size="x-large"
          :style="{marginTop: '2px'}"
          block
          color="primary"
        >
          <v-icon>mdi-magnify</v-icon>
        </WpButton>
      </v-col>
    </v-row>
  </WpForm>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'

const { ISO, ISOtoISO, unitDiff } = useDates()
const emits = defineEmits(['submit'])
const startDate = ref(useLocalStorage('startDate'))
const MIN_START = ref(0)
const MAX_START = ref(365)
const MIN_NIGHTS = ref(1)
const MAX_NIGHTS = ref(30)
const startLimit = computed(() => ({
  min: ISO({ plus: { days: MIN_START.value } }),
  max: ISO({ plus: { days: MAX_START.value } })
}))
const endDate = ref(useLocalStorage('endDate'))
const endLimit = computed(() => ({
  min: ISOtoISO(startDate.value, { plus: { days: MIN_NIGHTS.value } }),
  max: ISOtoISO(startDate.value, { plus: { days: MAX_NIGHTS.value } })
}))
const totalNights = computed(() => unitDiff(startDate.value, endDate.value, 'days'))
const validateEndDate = () => {
  if (totalNights.value < MIN_NIGHTS.value) {
    endDate.value = endLimit.value.min
  }
  if (totalNights.value > MAX_NIGHTS.value) {
    endDate.value = endLimit.value.max
  }
}
const setDefaultDates = () => {
  startDate.value = ISO()
  endDate.value = ISO({ plus: { months: 1 } })
}
const validateStoredStartDate = () => {
  const storedStartDate = localStorage.getItem('startDate')
  if (!storedStartDate || unitDiff(ISO(), storedStartDate, 'days') < 1) {
    setDefaultDates()
  }
}
validateStoredStartDate()
const guests = ref(useLocalStorage('guests', { adults: 2, children: 0 }))
const totalGuests = computed(() => guests.value.adults + guests.value.children)
const submit = () => {
  emits('submit', {
    startDate: toRaw(startDate.value),
    endDate: toRaw(endDate.value),
    guests: toRaw(totalGuests.value)
  })
}
</script>
