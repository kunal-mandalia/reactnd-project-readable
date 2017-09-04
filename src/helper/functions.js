import moment from 'moment'

export const friendlyDurationSince = (dateFuture, datePast) => {
  const [ minutes, hours, days, months, years ] = ['minutes', 'hours', 'days', 'months', 'years']
    .map(duration => moment(dateFuture).diff(datePast, duration))

  if (minutes < 1) {
    return 'now'
  } else if (minutes < 60) {
    return `${minutes}m`
  } else if (hours < 24) {
    return `${hours}h`
  } else if (days < 30) {
    return `${days}d`
  } else if (months < 12) {
    return `${months}mo`
  } else {
    return `>${years}y`
  }
}