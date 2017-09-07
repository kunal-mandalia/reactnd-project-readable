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
import NewPost from './NewPost'
import NewComment from './NewComment'

export class PostsContainer extends Component {

  editPost = (id, newTitle, newBody) => { this.props.editPost(id, newTitle, newBody) }
  deletePost = (id) => { this.props.deletePost(id) }
  beginEditPost = (id) => { this.props.beginEditPost(id) }
  endEditPost = (id) => { this.props.endEditPost(id) }
  beginEditComment = (id) => { this.props.beginEditComment(id) }
  endEditComment = (id) => { this.props.endEditComment(id) }
  editComment = (id, newBody) => { this.props.editComment(id, newBody) }
  deleteComment = (id) => { this.props.deleteComment(id) }
  votePost = (id, upVote) => { this.props.votePost(id, upVote) }
  voteComment = (id, upVote) => { this.props.voteComment(id, upVote) }
  newCommentShow = (parentId) => { this.props.newCommentShow(parentId) }

  render () {
    return (
      <div className='posts-container'>
        <NewPost />
        {Object.keys(this.props.posts).map(postId => {
          return (
            <div key={postId}>
              <Post
                {...this.props.posts[postId]}
                update={this.props.updates[postId]}
                onEdit={this.beginEditPost}
                onCancel={this.endEditPost}
                onSave={this.editPost}
                onDelete={this.deletePost}
                onVoteUp={() => { this.votePost(postId, true) }}
                onVoteDown={() => { this.votePost(postId, false) }}
                onReply={() => { this.newCommentShow(postId) }}
              />
              <div className='posts-comments'>
                {Object.keys(this.props.comments)
                  .map(commentId => this.props.comments[commentId])
                  .filter(c => c.parentId === postId )
                  .map(c => (
                    <Comment
                      key={c.id}
                      {...c}
                      onEdit={this.beginEditComment}
                      onCancel={this.endEditComment}
                      onSave={this.editComment}
                      onDelete={this.deleteComment}
                      onVoteUp={() => { this.voteComment(c.id, true) }}
                      onVoteDown={() => { this.voteComment(c.id, false) }}
                      update={this.props.updates[c.id]}
                      onReply={() => { this.newCommentShow(postId) }}
                    />
                    )
                  )
                }
                <NewComment
                  parentId={postId}
                />
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
  editPost: (id, newTitle, newBody) => dispatch(editPost({ id, title: newTitle, body: newBody })),
  deletePost: (id) => dispatch(deletePost(id)),
  beginEditPost: (id) => dispatch(beginEditPost(id)),
  endEditPost: (id) => dispatch(endEditPost(id)),
  beginEditComment: (id) => dispatch(beginEditComment(id)),
  endEditComment: (id) => dispatch(endEditComment(id)),
  editComment: (id, newBody) => dispatch(editComment({ id, body: newBody })),
  deleteComment: (id) => dispatch(deleteComment(id)),
  votePost: (id, upVote) => dispatch(votePost({ id, upVote })),
  voteComment: (id, upVote) => dispatch(voteComment({ id, upVote })),
  newCommentShow: (parentId) => dispatch(newCommentShow(parentId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)
