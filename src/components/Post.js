import React from 'react'
import InlineEdit from './InlineEdit'
import Rating from './Rating'
import MetaData from './MetaData'
import PropTypes from 'prop-types'
import '../styles/Post.css'

const Post = ({
  rating,
  author,
  date,
  body,
  onUpvote,
  onDownvote,
  onSave,
  onDelete
}) => (
  <div className='post'>
    <div className='row'>
      <Rating
        rating={4}
        onUpvote={() => {}}
        onDownvote={() => {}}
      />
      <div className='content'>
        <InlineEdit
          initialValue='initial value'
          onSave={() => {}}
          onDelete={() => {}}
        />
        <MetaData
          date={Date.now()}
          author='Kunal Mandalia'
        />
      </div>
    </div>
  </div>
)

Post.propTypes = {
  rating: PropTypes.number,
  author: PropTypes.string,
  date: PropTypes.number,
  body: PropTypes.string,
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
}

export default Post
