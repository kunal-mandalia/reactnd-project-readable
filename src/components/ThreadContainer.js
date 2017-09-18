import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loading from './Loading'
import NotFound from './NotFound'
import PostsContainer from './PostsContainer'
import { sortBy } from '../helper/functions'

export class ThreadContainer extends Component {
  render () {
    console.log('render!!!')
    const { loading, loaded, errors, user, posts, comments, updates, sort, match, filterBy, pathname } = this.props
    let node
    const sortedPosts = sortBy({ data: posts, by: sort.by, descending: sort.descending })
    const sortedComments = sortBy({ data: comments, by: sort.by, descending: sort.descending })
    let filteredPosts = sortedPosts
    if (loading) {
      node = <Loading />
    } else if (loaded) {
      if (filterBy === 'post') {
        const postId = pathname.split('/')[2]
        filteredPosts = sortedPosts.filter(p => p.id === postId)
      }
      else if (filterBy === 'category') {
        const category = pathname.split('/')[1]
        filteredPosts = sortedPosts.filter(p => p.category === category)
      }
      console.log('filteredPosts', filteredPosts)
      node = <PostsContainer
        user={user}
        posts={filteredPosts}
        comments={sortedComments}
        updates={updates}
        sort={sort}
        filterBy={filterBy} />
    } else {
      node = <NotFound />
    }

    return (
      <div className='thread-container'>
        {node}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  loaded: state.app.loaded,
  errors: state.app.errors,
  user: state.app.user,
  posts: state.app.posts,
  comments: state.app.comments,
  updates: state.app.updates,
  sort: state.app.sort,
  pathname: state.router.location.pathname
})

export default connect(mapStateToProps, null, null, { pure: false })(ThreadContainer)