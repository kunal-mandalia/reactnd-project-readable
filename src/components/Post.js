import React, { Component } from 'react'
import InlineEdit from './InlineEdit'
import Rating from './Rating'
import ActionBar from './ActionBar'
import PropTypes from 'prop-types'
import '../styles/Post.css'
import { EDIT_MODE, REQUEST, EDIT, SUCCESS, ERROR } from '../constants/index'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editTitle: props.title,
      editBody: props.body,
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeBody = this.handleChangeBody.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  handleChangeTitle (e) {
    this.setState({ editTitle: e.target.value })
  }

  handleChangeBody (e) {
    this.setState({ editBody: e.target.value })
  }

  onCancel () {
    const { title, body } = this.props
    this.setState(state => ({
      editTitle: title,
      editBody: body,
    }))
    this.props.onCancel(this.props.id)
  }

  render () {
    const editMode = this.props.update && (this.props.update.type === EDIT) && (this.props.update.status === EDIT_MODE)
    const node = this.props.deleted ? (
      <div className='post post-deleted'>
        <i>post deleted</i>
      </div>
    ) : (
      <div className='post'>
        <div className='post-row'>
          <Rating
            rating={this.props.voteScore}
            onVoteUp={this.props.onVoteUp}
            onVoteDown={this.props.onVoteDown}
          />
          <div className='post-content'>
            <InlineEdit
              className={`inline-edit post-title ${this.props.title === this.state.editTitle ? 'edit-input-unchanged' : 'edit-input-changed'}`}
              value={this.state.editTitle}
              onChange={this.handleChangeTitle}
              editMode={editMode}
            />
            <InlineEdit
              className={`inline-edit post-body ${this.props.body === this.state.editBody ? 'edit-input-unchanged' : 'edit-input-changed'}`}
              value={this.state.editBody}
              onChange={this.handleChangeBody}
              editMode={editMode}
              multiline
              autoFocus
            />
            <ActionBar
              id={this.props.id}
              editTitle={this.state.editTitle}
              editBody={this.state.editBody}
              date={this.props.timestamp}
              author={this.props.author}
              category={this.props.category}
              editMode={editMode}
              onEdit={this.props.onEdit}
              onSave={this.props.onSave}
              onDelete={this.props.onDelete}
              onCancel={this.onCancel}
              onReply={this.props.onReply}
              onReplyCancel={this.props.onReplyCancel}
            />
          </div>
        </div>
      </div>
    )
    return (
      <div className='post-wrapper'>
        {node}
      </div>
    )
  }
}

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
  onVoteUp: PropTypes.func,
  onVoteDown: PropTypes.func,
  update: PropTypes.object,
  onReply: PropTypes.func,
}

export default Post
