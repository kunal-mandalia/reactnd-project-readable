import React from 'react'
import InlineEdit from './InlineEdit'
import Rating from './Rating'
import MetaData from './MetaData'
import PropTypes from 'prop-types'
import '../styles/Post.css'

const Post = ({
  id,
  timestamp,
  title,
  body,
  author,
  category,
  voteScore,
  deleted,

  onUpvote,
  onDownvote,
  onSave,
  onDelete
}) => (
  <div className='post'>
    <div className='post-row'>
      <Rating
        rating={voteScore}
        onUpvote={() => {}}
        onDownvote={() => {}}
      />
      <div className='post-content'>
        <InlineEdit
          initialValue={`${title} - ${body}`}
          onSave={() => {}}
          onDelete={() => {}}
        />
        <MetaData
          date={timestamp}
          author={author}
        />
      </div>
    </div>
  </div>
)

Post.propTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  deleted: PropTypes.bool.isRequired,
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
}

export default Post
