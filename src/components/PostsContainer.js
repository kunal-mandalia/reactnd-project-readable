import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import '../styles/PostsContainer.css'
import {
  editPost,
  editComment,
  beginEditPost,
  endEditPost,
  beginEditComment,
  endEditComment,
  votePost,
  voteComment,
  deletePost,
  deleteComment,
  newCommentShow,
  newCommentHide,
} from '../actions/index.js'

import NewComment from './NewComment'

export class PostsContainer extends Component {
  constructor (props) {
    super(props)

    this.onEditPost = this.onEditPost.bind(this)
    this.onCancelPost = this.onCancelPost.bind(this)
    this.onSavePost = this.onSavePost.bind(this)
    this.onDeletePost = this.onDeletePost.bind(this)

    this.onEditComment = this.onEditComment.bind(this)
    this.onCancelComment = this.onCancelComment.bind(this)
    this.onSaveComment = this.onSaveComment.bind(this)

    this.onVoteUpPost = this.onVoteUpPost.bind(this)
    this.onVoteDownPost = this.onVoteDownPost.bind(this)
    this.onVoteUpComment = this.onVoteUpComment.bind(this)
    this.onVoteDownComment = this.onVoteDownComment.bind(this)
    this.onDeletePost = this.onDeletePost.bind(this)
    this.onDeleteComment = this.onDeleteComment.bind(this)

    this.onReply = this.onReply.bind(this)
    
  }

  onSavePost (id, newTitle, newBody) { this.props.dispatch(editPost({ id, title: newTitle, body: newBody })) }
  onDeletePost (id) { this.props.dispatch(deletePost(id)) }
  onEditPost (id) { this.props.dispatch(beginEditPost(id)) }
  onCancelPost (id) { this.props.dispatch(endEditPost(id)) }
  
  onEditComment (id) { this.props.dispatch(beginEditComment(id)) }
  onCancelComment (id) { this.props.dispatch(endEditComment(id)) }
  onSaveComment (id, newBody) { this.props.dispatch(editComment({ id, body: newBody })) }
  onDeleteComment (id) { this.props.dispatch(deleteComment(id)) }

  onVoteUpPost (id) { this.props.dispatch(votePost({ id, upVote: true })) }
  onVoteDownPost (id) { this.props.dispatch(votePost({ id, upVote: false })) }

  onVoteUpComment (id) { this.props.dispatch(voteComment({ id, upVote: true })) }
  onVoteDownComment (id) { this.props.dispatch(voteComment({ id, upVote: false })) }

  onReply (parentId) { this.props.dispatch(newCommentShow(parentId)) }

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
                onEdit={this.onEditPost}
                onCancel={this.onCancelPost}
                onSave={this.onSavePost}
                onDelete={this.onDeletePost}
                onVoteUp={() => { this.onVoteUpPost(postId) }}
                onVoteDown={() => { this.onVoteDownPost(postId) }}
                onReply={() => { this.onReply(postId) }}
              />
              <div className='posts-comments'>
                {Object.keys(this.props.comments)
                  .map(commentId => this.props.comments[commentId])
                  .filter(c => c.parentId === postId )
                  .map(c => (
                    <Comment
                      key={c.id}
                      {...c}
                      onEdit={this.onEditComment}
                      onCancel={this.onCancelComment}
                      onSave={this.onSaveComment}
                      onDelete={this.onDeleteComment}
                      onVoteUp={() => { this.onVoteUpComment(c.id) }}
                      onVoteDown={() => { this.onVoteDownComment(c.id) }}
                      update={this.props.updates[c.id]}
                      onReply={() => { this.onReply(postId) }}
                    />
                    )
                  )
                }
                <NewComment parentId={postId} />
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
