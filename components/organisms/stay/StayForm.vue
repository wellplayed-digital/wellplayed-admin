<template>
  <WpForm :disabled="loading" @submit="submit">
    <v-row dense>
      <v-col cols="12" sm="6" lg="3">
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
      <v-col cols="12" sm="6" lg="3">
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
      <v-col cols="12" sm="6" lg="3">
        <WpCounterField
          v-model="guests"
          :label="$t('global.guests', 2)"
          :min="1"
          :max="5"
          hide-details
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <WpButton
          type="submit"
          size="x-large"
          :style="{marginTop: '2px'}"
          block
          color="primary"
          :loading="loading"
        >
          <v-icon>mdi-magnify</v-icon>
        </WpButton>
      </v-col>
    </v-row>
  </WpForm>
</template>

<script setup>

const { ISO, ISOtoISO, unitDiff } = useDates()
const props = defineProps({
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  guests: { type: Number, required: true },
  loading: { type: Boolean, default: false }
})
const emits = defineEmits(['update:startDate', 'update:endDate', 'update:guests', 'submit'])
const startDate = computed({
  get: () => props.startDate,
  set: value => emits('update:startDate', value)
})
const endDate = computed({
  get: () => props.endDate,
  set: value => emits('update:endDate', value)
})
const guests = computed({
  get: () => props.guests,
  set: value => emits('update:guests', value)
})
const MIN_START = ref(0)
const MAX_START = ref(365)
const MIN_NIGHTS = ref(1)
const MAX_NIGHTS = ref(30)
const startLimit = computed(() => ({
  min: ISO({ plus: { days: MIN_START.value } }),
  max: ISO({ plus: { days: MAX_START.value } })
}))
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
const validateStoredDates = () => {
  const storedStartDate = localStorage.getItem('startDate')
  if (!storedStartDate || unitDiff(ISO(), storedStartDate, 'days') < 1) {
    startDate.value = ISO()
  }
  validateEndDate()
}
onMounted(validateStoredDates)
const submit = () => {
  emits('submit', {
    startDate: startDate.value,
    endDate: endDate.value,
    guests: guests.value
  })
}
</script>
