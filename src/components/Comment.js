import React from 'react'
import InlineEdit from './InlineEdit'
import Rating from './Rating'
import MetaData from './MetaData'
import PropTypes from 'prop-types'
import '../styles/Comment.css'

const Comment = ({
  id,
  parentId,
  timestamp,
  body,
  author,
  voteScore,
  deleted,
  parentDeleted,

  onUpvote,
  onDownvote,
  onSave,
  onDelete
}) => (
  <div className='comment'>
    <div className='comment-row'>
      <Rating
        rating={voteScore}
        onUpvote={() => {}}
        onDownvote={() => {}}
      />
      <div className='comment-content'>
        <InlineEdit
          initialValue={`${body}`}
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

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  deleted: PropTypes.bool.isRequired,
  parentDeleted: PropTypes.bool.isRequired,
  
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
}

export default Comment
