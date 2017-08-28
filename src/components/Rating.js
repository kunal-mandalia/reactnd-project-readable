import React from 'react'
import PropTypes from 'prop-types'
import ChevronUp from 'react-icons/lib/fa/chevron-up'
import ChevronDown from 'react-icons/lib/fa/chevron-down'
import '../styles/Rating.css'

const Rating = ({ rating, onUpvote, onDownvote }) => (
  <div className='rating'>
    <div id='upvote-button' onClick={onUpvote}>
      <ChevronUp size={20} color='grey' className='vote' />
    </div>
    <div id='rating-value' className='rating-value'>
      {rating}
    </div>
    <div id='downvote-button' onClick={onDownvote}>
      <ChevronDown size={20} color='grey' className='vote' />
    </div>
  </div>
)

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired
}

export default Rating
