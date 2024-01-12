import { DateTime, Settings } from 'luxon'
import { useLocale } from 'vuetify'

export default () => {
  const { current } = useLocale()
  Settings.defaultLocale = current.value

  const ISO = (options = { plus: {} }) => {
    return DateTime.local().plus(options.plus).toISODate()
  }
  const ISOtoISO = (date, options = { plus: {} }) => {
    if (!date) { return null }
    return DateTime.fromISO(date).plus(options.plus).toISODate()
  }
  const ISOtoJS = (date, options = { plus: {} }) => {
    if (!date) { return null }
    return DateTime.fromISO(date).plus(options.plus).toJSDate()
  }
  const JStoISO = (date, options = { plus: {} }) => {
    if (!date) { return null }
    return DateTime.fromJSDate(date).plus(options.plus).toISODate()
  }
  const ISOtoFormat = (date, options = { format: 'DATE_MED' }) => {
    if (!date) { return null }
    return DateTime.fromISO(date).toLocaleString(DateTime[options.format])
  }
  const JStoFormat = (date, options = { format: 'DATE_MED' }) => {
    if (!date) { return null }
    return DateTime.fromJSDate(date).toLocaleString(DateTime[options.format])
  }
  const unitDiff = (startDate, endDate, unit) => {
    if (!startDate || !endDate) { return null }
    return DateTime.fromISO(endDate).diff(DateTime.fromISO(startDate), unit).toObject()[unit]
  }

  return {
    ISO,
    ISOtoISO,
    ISOtoJS,
    ISOtoFormat,
    JStoISO,
    JStoFormat,
    unitDiff
  }
}
