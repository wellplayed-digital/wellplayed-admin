<template>
  <v-container>
    <WpWrapper max-width="60rem">
      <v-form
        v-model="valid"
        class="d-flex column-gap-1"
        @submit.prevent="submit"
      >
        <v-row dense>
          <v-col cols="12" md="3">
            <WpDatePicker
              v-model="startDate"
              :min="todayPlusOneDay"
              label="Fecha de Llegada"
              :rules="[required]"
              @update:model-value="checkEndDate"
            />
          </v-col>
          <v-col cols="12" md="3">
            <WpDatePicker
              v-model="endDate"
              :min="startDatePlusOneDay"
              :max="startDatePlusTwoMonths"
              label="Fecha de Salida"
              :rules="[required]"
            />
          </v-col>
          <v-col cols="12" md="3">
            <WpSelect
              v-model="guestCount"
              :items="guestCountOptions"
              :rules="[required]"
            />
          </v-col>
          <v-col cols="12" md="3">
            <WpButton type="submit" size="x-large" :style="{marginTop: '2px'}" block>
              Buscar
            </WpButton>
          </v-col>
        </v-row>
      </v-form>
      <div v-if="daysSelected" class="text-body-2 text-disabled">
        Dias seleccionados: {{ daysSelected }}
      </div>
    </WpWrapper>
  </v-container>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'
const { ISO, ISOtoISO, unitDiff } = useDates()
const { required } = useRules()
const valid = ref(false)
const todayPlusOneDay = ref(ISO({ plus: { days: 1 } }))
const startDate = ref(useLocalStorage('startDate', todayPlusOneDay.value))
const startDatePlusOneDay = computed(() => {
  if (!startDate.value) { return null }
  return ISOtoISO(startDate.value, { plus: { days: 1 } })
})
const startDatePlusOneWeek = computed(() => {
  if (!startDate.value) { return null }
  return ISOtoISO(startDate.value, { plus: { weeks: 1 } })
})
const startDatePlusTwoMonths = computed(() => {
  if (!startDate.value) { return null }
  return ISOtoISO(startDate.value, { plus: { months: 2 } })
})
const endDate = ref(useLocalStorage('endDate', startDatePlusOneWeek.value))
const checkEndDate = () => {
  if (!endDate.value || unitDiff(startDatePlusOneDay.value, endDate.value, 'days') < 0) {
    endDate.value = startDatePlusOneDay.value
  }
}
const daysSelected = computed(() => {
  if (!startDate.value || !endDate.value) { return null }
  return unitDiff(startDate.value, endDate.value, 'days')
})
const guestCountOptions = ref([
  { title: 'Cabaña para 2', value: 2 },
  { title: 'Cabaña para 4', value: 4 }
])
const guestCount = ref(guestCountOptions.value[0])
const submit = () => {
  if (!valid.value) { return }
  console.log('submit')
}
</script>
