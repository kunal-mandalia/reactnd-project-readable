import React from 'react'
import PropTypes from 'prop-types'
import ChevronUp from 'react-icons/lib/fa/chevron-up'
import ChevronDown from 'react-icons/lib/fa/chevron-down'
import '../styles/Rating.css'

const Rating = ({ rating, onVoteUp, onVoteDown }) => (
  <div className='rating'>
    <div id='upvote-button' onClick={onVoteUp}>
      <ChevronUp size={15} color='grey' className='vote' />
    </div>
    <div id='rating-value' className='rating-value'>
      {rating}
    </div>
    <div id='downvote-button' onClick={onVoteDown}>
      <ChevronDown size={15} color='grey' className='vote' />
    </div>
  </div>
)

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired
}

export default Rating
