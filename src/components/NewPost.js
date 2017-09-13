import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InlineEdit from './InlineEdit'
import { connect } from 'react-redux'
import { createPost } from '../actions/index'
import { v1 as uuid } from 'uuid'
import '../styles/NewPost.css'
import '../styles/ActionBar.css'
import { CREATE_POST_SUCCESS } from '../constants/index'

export class NewPost extends Component {
  constructor (props) {
    super(props)
    const id = uuid()    
    this.state = {
      id,
      title: ``,
      body: ``,
      category: ``,
      show: false
    }
  }

  handleTitleChange = (e) => { this.setState({ title: e.target.value })}
  handleBodyChange = (e) => { this.setState({ body: e.target.value }) }
  handleCategoryChange = (e) => { this.setState({ category: e.target.value }) }
  toggleShow = () => { this.setState(state => ({ show: !state.show })) }
  onSave = () => {
    const { id, title, body, category } = this.state
    if (title !== '' && body !== '' && category !== '') {
      const timestamp = Date.now()
      const post = {
        id,
        title,        
        body,
        author: this.props.user,
        category,
        timestamp
      }
      this.props.createPost(post)
    }
  }

  componentWillReceiveProps (props) {
    if (props.newPost[this.state.id] === CREATE_POST_SUCCESS) {
      const id = uuid()    
      this.state = {
        id,
        title: ``,
        body: ``,
        category: ``,
        show: false
      }
    }
  }

  render () {
    const { id, title, body, category, show } = this.state
    return (
      <div className='new-post'>
        {show ? (
          <div className='new-post-expanded'>
            <h4 className='new-post-headline'>New Post</h4>
            <InlineEdit
              placeholder='post title*'
              editMode={true}
              value={title}
              onChange={this.handleTitleChange.bind(this)}
              className={`input-title ${title !== '' ? 'edit-input-changed' : 'edit-input'}`}
            />
            <InlineEdit
              placeholder='body*'
              editMode={true}
              value={body}
              onChange={this.handleBodyChange.bind(this)}
              multiline
              className={`input-body ${body !== '' ? 'edit-input-changed' : 'edit-input'}`}
            />
            <InlineEdit
              placeholder='category* e.g. react'
              editMode={true}
              value={category}
              onChange={this.handleCategoryChange.bind(this)}
              className={`input-category ${category !== '' ? 'edit-input-changed' : 'edit-input'}`}
            />
            <hr className='separator' />
            <div className='action-bar'>
              [
                <a
                  id='save'
                  className={`action-bar-action ${(title === '' || body === '' || category === '') ? 'disabled-link' : ''}`} onClick={this.onSave.bind(this)}> save </a> | 
                <a className='action-bar-action' onClick={this.toggleShow.bind(this)}> cancel </a>
              ]
            </div>
          </div>
        ) : (
          <div className='new-post-collapsed'>
            <div className='action-bar'>
              [
                <a className='action-bar-action add-new-post' onClick={this.toggleShow.bind(this)}> Add New Post </a>
              ]
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  newPost: state.newPost,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
