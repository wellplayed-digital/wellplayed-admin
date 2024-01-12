<template>
  <div class="h-100 d-flex align-end">
    <WpContainer max-width="70rem">
      <v-form v-model="valid" class="py-4" @submit.prevent="submit">
        <v-row dense>
          <v-col cols="12" sm="6" md="3">
            <WpDatePicker
              v-model="startDate"
              :min="todayPlusOneDay"
              label="Fecha de Llegada"
              hide-details
              @update:model-value="validateEndDate"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <WpDatePicker
              v-model="endDate"
              :min="startDatePlusOneDay"
              :max="startDatePlusTwoMonths"
              label="Fecha de Salida"
              hide-details
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <SearchDatesGuestsMenu v-model="guests" />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <WpButton
              type="submit"
              size="x-large"
              :style="{marginTop: '2px'}"
              block
            >
              Buscar
            </WpButton>
          </v-col>
          <v-col cols="12">
            <div v-if="nightsCount" class="text-body-2 text-disabled mt-2">
              Estadia: {{ nightsCount }} {{ plural('noche', nightsCount) }}
            </div>
          </v-col>
        </v-row>
      </v-form>
    </WpContainer>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'
const { ISO, ISOtoISO, unitDiff } = useDates()
const { plural } = useHelpers()
const valid = ref(false)
const todayPlusOneDay = ref(ISO({ plus: { days: 1 } }))
const startDate = ref(useLocalStorage('startDate'))
const endDate = ref(useLocalStorage('endDate'))
const startDatePlusOneDay = computed(() => ISOtoISO(startDate.value, { plus: { days: 1 } }))
const startDatePlusTwoMonths = computed(() => ISOtoISO(startDate.value, { plus: { months: 2 } }))
const validateEndDate = () => {
  if (unitDiff(startDatePlusOneDay.value, endDate.value, 'days') < 0) {
    endDate.value = startDatePlusOneDay.value
  }
}
const nightsCount = computed(() => unitDiff(startDate.value, endDate.value, 'days'))
const setDefaultDates = () => {
  startDate.value = todayPlusOneDay.value
  endDate.value = ISOtoISO(startDate.value, { plus: { weeks: 1 } })
}
const validateStoredStartDate = () => {
  const storedStartDate = localStorage.getItem('startDate')
  if (!storedStartDate || unitDiff(todayPlusOneDay.value, storedStartDate, 'days') < 0) {
    setDefaultDates()
  }
}
validateStoredStartDate()
const guests = ref(useLocalStorage('guests', { adults: 2, children: 0 }))
const submit = () => {
  if (!valid.value) { return }
  console.log('submit')
}
</script>
