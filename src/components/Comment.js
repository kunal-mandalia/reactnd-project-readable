import React, { Component } from 'react'
import InlineEdit from './InlineEdit'
import Rating from './Rating'
import ActionBar from './ActionBar'
import PropTypes from 'prop-types'
import '../styles/Comment.css'
import { EDIT_MODE, REQUEST, EDIT, SUCCESS, ERROR } from '../constants/index'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editBody: props.body,
    }
    this.handleChangeBody = this.handleChangeBody.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  handleChangeBody (e) {
    this.setState({ editBody: e.target.value })
  }

  onCancel () {
    this.setState(state => ({
      editBody: this.props.body,
    }))
    this.props.onCancel(this.props.id)
  }

  render () {
    const editMode = this.props.update && (this.props.update.type === EDIT) && (this.props.update.status === EDIT_MODE)
    const node = this.props.deleted ? (
      <div className='comment comment-deleted'>
        <i>comment deleted</i>
      </div>
    ) : (
      <div className='comment'>
        <div className='comment-row'>
          <Rating
            rating={this.props.voteScore}
            onVoteUp={this.props.onVoteUp}
            onVoteDown={this.props.onVoteDown}
          />
          <div className='comment-content'>
            <InlineEdit
              className={`inline-edit comment-body ${this.props.body === this.state.editBody ? 'edit-input-unchanged' : 'edit-input-changed'}`}
              value={this.state.editBody}
              onChange={this.handleChangeBody}
              editMode={editMode}
              multiline
              autoFocus
            />
            <ActionBar
              date={this.props.timestamp}
              author={this.props.author}
              editBody={this.state.editBody}
              editMode={editMode}
              onEdit={() => { this.props.onEdit(this.props.id) }}
              onCancel={this.onCancel}
              onSave={ () => { this.props.onSave(this.props.id, this.state.editBody) }}
              onDelete={() => { this.props.onDelete(this.props.id) }}
              onReply={this.props.onReply}
              hideCategory
              isAuthor={this.props.isAuthor}
            />
          </div>
        </div>
      </div>
    )

    return (
      <div className='comment-wrapper'>
        {node}
      </div>
    )
  }
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  deleted: PropTypes.bool.isRequired,
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  isAuthor: PropTypes.bool
}

export default Comment
