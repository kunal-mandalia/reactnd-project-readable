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

export const sortBy = ({ data, by, descending = true }) => {
  if (typeof (data) !== 'object' && (by !== 'date' || by !== 'votes')) {
    throw new Error(`sortBy encountered invalid args: ${JSON.stringify({ by, descending })}`)
  } else {
    // sort by post date descending
    const property = by === 'date' ? 'timestamp' : 'voteScore'
    const compare = (a,b, descending) => descending ? ( b - a ) : ( a - b )
    return Object.keys(data).map(k => data[k]).sort((d1, d2) => compare(d1[property], d2[property], descending) )
  }
}
