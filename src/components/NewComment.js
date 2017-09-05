import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
        author: `theThingyBob`,
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
            <a className='action-bar-action' onClick={() => { this.props.dispatch(newCommentHide()) }}> cancel </a>
          ]
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  newComment: state.newComment
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  createComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)
