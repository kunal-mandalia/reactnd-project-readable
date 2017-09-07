import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InlineEdit from './InlineEdit'
import { connect } from 'react-redux'
import { createPost } from '../actions/index'
import { v1 as uuid } from 'uuid'
// import '../styles/NewPost.css'
import '../styles/ActionBar.css'

export class NewPost extends Component {
  state = {
    title: ``,
    body: ``,
    category: ``,
    show: false
  }

  handleTitleChange = (e) => { this.setState({ title: e.target.value })}
  handleBodyChange = (e) => { this.setState({ body: e.target.value }) }
  toggleShow = () => { this.setState(state => ({ show: !state.show })) }
  onSave = () => {
    if (this.state.title !== '' && this.state.body !== '') {
      const id = uuid()
      const timestamp = Date.now()
      const post = {
        id,
        title: this.state.title,        
        body: this.state.body,
        author: `theThingyBob`,
        category: `react`,
        timestamp
      }
      this.props.createPost(post)
    }
  }

  render () {
    return (
      <div className='new-post'>
        {this.state.show ? (
          <div className='new-post-expanded'>
            <InlineEdit
              editMode={true}
              value={this.state.title}
              onChange={this.handleTitleChange.bind(this)}
              className={`input-title ${this.state.title !== '' ? 'edit-input-changed' : 'edit-input'}`}
            />
            <InlineEdit
              editMode={true}
              value={this.state.body}
              onChange={this.handleBodyChange.bind(this)}
              multiline
              className={`input-body ${this.state.body !== '' ? 'edit-input-changed' : 'edit-input'}`}
            />
            <div className='action-bar'>
              [
                <a id='save' className={`action-bar-action ${this.state.body === '' ? 'disabled-link' : ''}`} onClick={this.onSave.bind(this)}> save </a> | 
                <a className='action-bar-action' onClick={this.toggleShow.bind(this)}> cancel </a>
              ]
            </div>
          </div>
        ) : (
          <div className='new-post-collapsed'>
            <div className='action-bar'>
              [
                <a className='action-bar-action add-new-post' onClick={this.toggleShow.bind(this)}> Add new post </a>
              ]
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
