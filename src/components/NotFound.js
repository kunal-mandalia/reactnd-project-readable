import React from 'react'

import '../styles/NotFound.css'

const getDisplayMessage = filterBy => {
  switch (filterBy) {
    case 'none':
      return `Lucky number one. Be the first poster!`
    case 'category':
      return `That category isn't looking very popular. Create a post for it to get it started.`
    case 'post':
      return `We couldn't find that post.`
    default:
      return `404. We couldn't find what you requested.`
  }
}

export const NotFound = ({ filterBy }) => {
  const displayMessage = getDisplayMessage(filterBy)
  return (
    <div className='not-found'>
      {displayMessage}
    </div>
  )
}

export default NotFound
