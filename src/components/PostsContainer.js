import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import Sort from './Sort'
import NewPost from './NewPost'
import NewComment from './NewComment'
import { sortBy } from '../helper/functions'
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
import '../styles/PostsContainer.css'

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
    const { posts, comments, sort, filter } = this.props
    const sortedPosts = sortBy({ data: posts, by: sort.by, descending: sort.descending }).filter(p => p.category.includes(filter) )
    const sortedComments = sortBy({ data: comments, by: sort.by, descending: sort.descending })
    return (
      <div className='posts-container'>
        <Sort />
        <NewPost />
        {sortedPosts.map(p => (
          <div key={p.id}>
            <Post
              {...p}
              update={this.props.updates[p.id]}
              onEdit={this.beginEditPost}
              onCancel={this.endEditPost}
              onSave={this.editPost}
              onDelete={this.deletePost}
              onVoteUp={() => { this.votePost(p.id, true) }}
              onVoteDown={() => { this.votePost(p.id, false) }}
              onReply={() => { this.newCommentShow(p.id) }}
            />
            <div className='posts-comments'>
              {sortedComments.filter(c => c.parentId === p.id )
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
                    onReply={() => { this.newCommentShow(p.id) }}
                  />
              ))}
              <NewComment parentId={p.id} />
            </div>            
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  comments: state.comments,
  updates: state.updates,
  sort: state.sort,
  filter: state.filter
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
