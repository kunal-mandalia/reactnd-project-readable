import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InlineEdit from './InlineEdit'
import { connect } from 'react-redux'

export class NewComment extends Component {
  state = {
    body: ''
  }

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value })
  }

  render () {
    return (
      <div className='new-comment'>
        <InlineEdit
          editMode={true}
          value={this.state.body}
          onChange={this.handleBodyChange}
          multiline
          autoFocus
        />
        <div className='new-comment-actions'>
          [
            <a className='action-bar-action' onClick={() => { }}> save </a> | 
            <a className='action-bar-action' onClick={() => { }}> cancel </a>
          ]
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  show: true
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)
