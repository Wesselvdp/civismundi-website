import moment from 'moment'

type MomentComparison = (a: moment.Moment, b: moment.Moment) => boolean

// Utils from 'airbnb/react-dates/src/utils'

const isSameDay: MomentComparison = (a, b) => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return (
    a.date() === b.date() && a.month() === b.month() && a.year() === b.year()
  )
}

const isInclusivelyBeforeDay: MomentComparison = (a, b) => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false
  return !isAfterDay(a, b)
}

const isInclusivelyAfterDay: MomentComparison = (a, b) => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false
  return !isBeforeDay(a, b)
}

const isBeforeDay: MomentComparison = (a, b) => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false

  const aYear = a.year()
  const aMonth = a.month()

  const bYear = b.year()
  const bMonth = b.month()

  const isSameYear = aYear === bYear
  const isSameMonth = aMonth === bMonth

  if (isSameYear && isSameMonth) return a.date() < b.date()
  if (isSameYear) return aMonth < bMonth
  return aYear < bYear
}

const isAfterDay: MomentComparison = (a, b) => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false
  return !isBeforeDay(a, b) && !isSameDay(a, b)
}

export {
  isSameDay,
  isBeforeDay,
  isAfterDay,
  isInclusivelyAfterDay,
  isInclusivelyBeforeDay
}
