import { DateTime } from 'luxon'

export default () => {
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
  const ISOtoFormat = (date, options = { format: 'DATE_MED' }) => {
    if (!date) { return null }
    return DateTime
      .fromISO(date, { locale: 'en-US' })
      .toLocaleString(DateTime[options.format])
  }

  const JStoISO = (date, options = { plus: {} }) => {
    if (!date) { return null }
    return DateTime.fromJSDate(date).plus(options.plus).toISODate()
  }
  const JStoFormat = (date, options = { format: 'DATE_MED' }) => {
    if (!date) { return null }
    return DateTime
      .fromJSDate(date, { locale: 'en-US' })
      .toLocaleString(DateTime[options.format])
  }

  const unitDiff = (startDate, endDate, unit) => {
    if (!startDate || !endDate) { return null }
    return DateTime
      .fromISO(endDate)
      .diff(DateTime.fromISO(startDate), unit)
      .toObject()[unit]
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
