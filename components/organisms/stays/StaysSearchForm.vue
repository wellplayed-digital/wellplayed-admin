<template>
  <WpForm @submit="searchStays">
    <v-row dense>
      <v-col cols="12" sm="6" md="3">
        <WpDatePicker
          v-model="startDate"
          :min="startLimit.min"
          :max="startLimit.max"
          label="Fecha de Llegada"
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
          prepend-inner-icon="mdi-calendar-end"
          label="Fecha de Salida"
          hide-details
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <StaysSearchGuestsMenu v-model="guests" />
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
      <v-col v-if="totalNights" cols="auto">
        <div class="mt-2 d-flex align-center">
          <v-icon icon="mdi-clock-outline" color="grey" />
          <div class="text-body-2 text-medium-emphasis ml-1">
            Estadia: {{ totalNights }} {{ plural('noche', totalNights) }}
          </div>
        </div>
      </v-col>
    </v-row>
  </WpForm>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'

const { ISO, ISOtoISO, unitDiff } = useDates()
const { plural } = useHelpers()
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
const searchStays = () => {
  emits('submit', { startDate: startDate.value, endDate: endDate.value, guests: guests.value })
}
</script>
