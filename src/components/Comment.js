import React, { Component } from 'react'
import InlineEdit from './InlineEdit'
import Rating from './Rating'
import ActionBar from './ActionBar'
import PropTypes from 'prop-types'
import '../styles/Comment.css'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: props.body,
      editBody: props.body,
    }
    this.handleChangeBody = this.handleChangeBody.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  handleChangeBody (e) {
    this.setState({ editBody: e.target.value })
  }

  onSave () {
    this.setState(state => ({
      title: state.editTitle,
      body: state.editBody,
      editMode: false
    }))
  }

  onCancel () {
    this.setState(state => ({
      editTitle: state.title,
      editBody: state.body,
      editMode: false
    }))
  }

  onDelete () {
    this.setState({
      editMode: false      
    })
  }

  onEdit () {
    this.setState({ editMode: true })
  }

  render () {
    return (
      <div className='comment'>
        <div className='comment-row'>
          <Rating
            rating={this.props.voteScore}
            onUpvote={() => {}}
            onDownvote={() => {}}
          />
          <div className='comment-content'>
            <InlineEdit
              className={`inline-edit comment-body ${this.state.body === this.state.editBody ? 'edit-input-unchanged' : 'edit-input-changed'}`}
              value={this.state.editBody}
              onChange={this.handleChangeBody}
              editMode={this.state.editMode}
              multiline
            />
            <ActionBar
              date={this.props.timestamp}
              author={this.props.author}
              category={this.props.category}
              editMode={this.state.editMode}
              onEdit={this.onEdit}
              onSave={this.onSave}
              onDelete={this.onDelete}
              onCancel={this.onCancel}
            />
          </div>
        </div>
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
}

export default Comment
