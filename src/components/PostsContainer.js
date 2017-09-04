import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import '../styles/PostsContainer.css'
import { editPost, beginEditPost, endEditPost } from '../actions/index.js'

export class PostsContainer extends Component {
  constructor (props) {
    super(props)
    this.onSave = this.onSave.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onVote = this.onVote.bind(this)
  }


  onSave (id, editTitle, editBody) {
    this.props.dispatch(editPost({
      id,
      title: editTitle,
      body: editBody
    }))
  }

  onCancel (id) { this.props.dispatch(endEditPost(id)) }

  onDelete () {
    
  }

  onEdit (id) { this.props.dispatch(beginEditPost(id)) }

  onVote (value, source) {
    console.log('onVote', value, source)
  }

  render () {
    return (
      <div className='posts-container'>
        {Object.keys(this.props.posts).map(postId => {
          return (
            <div key={postId}>
              <Post
                {...this.props.posts[postId]}
                update={this.props.updates[postId]}
                dispatch={this.props.dispatch}
                onEdit={this.onEdit}
                onCancel={this.onCancel}
                onSave={this.onSave}
                onDelete={this.onDelete}
              />
              <div className='posts-comments'>
                {Object.keys(this.props.comments)
                  .map(commentId => this.props.comments[commentId])
                  .filter(c => c.parentId === postId )
                  .map(c => (
                    <Comment
                      key={c.id}
                      {...c}
                      
                    />
                    )
                  )
                }
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  comments: state.comments,
  updates: state.updates
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)
