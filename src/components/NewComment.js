import React, { Component } from 'react'
import InlineEdit from './InlineEdit'
import { connect } from 'react-redux'
import { newCommentHide, createComment } from '../actions/index'
import { v1 as uuid } from 'uuid'
import '../styles/NewComment.css'
import '../styles/ActionBar.css'

export class NewComment extends Component {
  state = { body: '' }

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value })
  }

  onSave = () => {
    if (this.state.body !== '') {
      const id = uuid()
      const timestamp = Date.now()
      const comment = {
        id,
        body: this.state.body,
        author: this.props.user,
        parentId: this.props.parentId,
        timestamp
      }
      this.props.createComment(comment)
    }
  }

  render () {
    const { show, parentId } = this.props.newComment
    const showComment = show && parentId === this.props.parentId
    return (
      <div className={showComment ? 'new-comment' : 'hidden'}>
        <InlineEdit
          editMode={true}
          value={this.state.body}
          onChange={this.handleBodyChange}
          multiline
          autoFocus
          className={this.state.body !== '' ? 'edit-input-changed' : 'edit-input'}
        />
        <div className='action-bar'>
          [
            <a className={`action-bar-action ${this.state.body === '' ? 'disabled-link' : ''}`} onClick={this.onSave}> save </a> | 
            <a className='action-bar-action' onClick={this.props.newCommentHide}> cancel </a>
          ]
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  newComment: state.app.newComment,
  user: state.app.user
})

const mapDispatchToProps = dispatch => ({
  newCommentHide: () => dispatch(newCommentHide()),
  createComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)
