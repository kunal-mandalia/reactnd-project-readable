import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../styles/MetaData.css'

const MetaData = ({ date, author }) => {
  const daysSince = moment().diff(date, 'days')
  const minutesSince = moment().diff(date, 'days')
  return (
    <div className='meta-data'>
      <div className='date'>
        {daysSince > 0 ? `${daysSince}d` : `${minutesSince}m`}
      </div>
      <div className='author'>
        {author}
      </div>
    </div>
  )
}

MetaData.propTypes = {
  date: PropTypes.number,
  author: PropTypes.string
}

export default MetaData
