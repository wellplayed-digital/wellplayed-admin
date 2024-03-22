<template>
  <WpForm :disabled="disabled" @submit="submit">
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
        <WpCounterField
          v-model="guests"
          :label="$t('global.guests', 2)"
          :min="1"
          :max="5"
          hide-details
        />
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

const route = useRoute()
const router = useRouter()
const { ISO, ISOtoISO, unitDiff } = useDates()
const props = defineProps({
  disabled: { type: Boolean, default: false },
  watchQuery: { type: Boolean, default: false }
})
const emits = defineEmits(['submit'])
const startDate = ref(useLocalStorage('startDate'))
const endDate = ref(useLocalStorage('endDate'))
const guests = ref(useLocalStorage('guests', 1))
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
const submit = async () => {
  if (props.watchQuery) {
    await router.push({
      query: {
        startDate: startDate.value,
        endDate: endDate.value,
        guests: guests.value
      }
    })
  }
  emits('submit')
}
onMounted(() => {
  validateStoredDates()
  if (props.watchQuery) {
    startDate.value = route.query.startDate || startDate.value
    endDate.value = route.query.endDate || endDate.value
    guests.value = route.query.guests || guests.value
    submit()
  }
})
</script>
