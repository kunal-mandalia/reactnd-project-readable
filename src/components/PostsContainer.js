import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import '../styles/PostsContainer.css'

export const getCommentsNode = (postId, comments) => (
  <div key={`comments-for-${postId}`}>
    {
      comments
      .filter(c => c.parentId === postId )
      .map(c => (
        <div className='comment'>comment: {c.body}</div>
      ))
    }
  </div>
)

export class PostsContainer extends Component {
  constructor (props) {
    super(props)
  }

  onVote (value, source) {
    console.log('onVote', value, source)
  }

  render () {
    return (
      <div className='posts-container'>
        {this.props.posts.map(p => {
          return (
            <div key={p.id}>
              <Post {...p} />
              <div className='posts-comments'>
                {this.props.comments
                  .filter(c => c.parentId === p.id )
                  .map(c => (
                    <Comment key={c.id} {...c} />
                  ))
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
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)
