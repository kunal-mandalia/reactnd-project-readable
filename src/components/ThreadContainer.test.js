import React from 'react'
import { ThreadContainer } from './ThreadContainer'
import { shallow, mount } from 'enzyme'
import Post from './Post'
import Comment from './Comment'
import Loading from './Loading'
import NotFound from './NotFound'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { initialState } from '../reducers/index'
import createHistory from 'history/createBrowserHistory'
import { sortBy } from '../helper/functions'

const history = createHistory()
const mockStore = configureStore();
const store = mockStore(initialState)

const props = {
  loading: false,
  loaded: true,
  user: 'thingone',
  categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      }
  ],
  posts: {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false 
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false
    }
  },
  comments: {
    "894tuq4ut84ut8v4t8wun89g": {
      id: '894tuq4ut84ut8v4t8wun89g',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1468166872634,
      body: 'Hi there! I am a COMMENT.',
      author: 'thingtwo',
      voteScore: 6,
      deleted: false,
      parentDeleted: false 
    },
    "8tu4bsun805n8un48ve89": {
      id: '8tu4bsun805n8un48ve89',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1469479767190,
      body: 'Comments. Are. Cool.',
      author: 'thingone',
      voteScore: -5,
      deleted: false,
      parentDeleted: false
    },
    "8tu4bsun805n8un48ve90": {
      id: '8tu4bsun805n8un48ve90',
      parentId: "6ni6ok3ym7mf1p33lnez",
      timestamp: 1469479767190,
      body: 'Comments. Are. Cool. Override',
      author: 'thingone',
      voteScore: -1,
      deleted: false,
      parentDeleted: false
    }
  },
  updates: [],
  sort: { by: 'votes', descending: true },
}

const setup = (component) => (
  mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {component}
      </ConnectedRouter>
    </Provider>)
  )

describe(`<ThreadContainer .../>`, () => {
  it(`should render <Loading /> if loading`, () => {
    const match = { params: { }}
    const wrapper = setup(<ThreadContainer {...props} match={match} loading />)
    expect(wrapper.find(Post)).toHaveLength(0)
    expect(wrapper.find(Comment)).toHaveLength(0)
    expect(wrapper.find(Loading)).toHaveLength(1)
  })

  const totalPosts = Object.keys(props.posts).length
  const totalComments = Object.keys(props.comments).length
  it(`should render ${totalPosts} posts and ${totalComments} comments on root page when loaded`, () => {
    const match = { params: { }}
    const wrapper = setup(<ThreadContainer {...props} match={match} />)
    expect(wrapper.find(Post)).toHaveLength(totalPosts)
    expect(wrapper.find(Comment)).toHaveLength(totalComments)
  })

  it(`should filter posts and comments by /:category`, () => {
    const category = 'react'
    const match = { params: { category }}
    const wrapper = setup(<ThreadContainer {...props} match={match} />)
    const filteredPosts = Object.keys(props.posts).map(pId => props.posts[pId]).filter(p => p.category === category)
    const filteredPostsId = filteredPosts.map(p => p.id)
    const filteredComments = Object.keys(props.comments).map(c => props.comments[c].parentId).filter(pId => filteredPostsId.includes(pId))
    expect(wrapper.find(Post)).toHaveLength(filteredPosts.length)
    expect(wrapper.find(Comment)).toHaveLength(filteredComments.length)
  })

  // it(`should render <NotFound .../> if category is not found`, () => {
  //   const match = { params: { category: 'unknown-category' } }
  //   const wrapper = shallow(<ThreadContainer {...props} match={match} />)
  //   expect(wrapper.find(Post)).toHaveLength(0)
  //   expect(wrapper.find(Comment)).toHaveLength(0)
  //   expect(wrapper.find(Loading)).toHaveLength(1)
  // })

  // it(`should show one post given existing /:category/:postId`, () => {
  //   const category = 'react'
  //   const postId = '8xf0y6ziyjabvozdd253nd'
  //   const match = { params: { category, postId }}
  //   const wrapper = shallow(<ThreadContainer {...props} match={match} />)
  //   const filteredPosts = props.posts.filter(p => (p.category === category && p.id === postId ))
  //   const filteredPostsId = filteredPosts.map(p => p.id)
  //   const filteredComments = props.comments.filter(c => filteredPostIds.contains(c.parentId))
  //   expect(wrapper.find(Post)).toHaveLength(props.posts.filter(p => p.category === category ).length)
  //   expect(wrapper.find(Comment)).toHaveLength(filteredComments.length)
  // })

  // it(`should render <NotFound .../> give known category and unknown postId /:category/:postId`, () => {
  //   const category = 'react'
  //   const postId = 'unknown-postId'
  //   const match = { params: { category, postId }}
  //   const wrapper = shallow(<ThreadContainer {...props} match={match} />)
  //   const filteredPosts = props.posts.filter(p => (p.category === category && p.id === postId ))
  //   const filteredPostsId = filteredPosts.map(p => p.id)
  //   const filteredComments = props.comments.filter(c => filteredPostIds.contains(c.parentId))
  //   expect(wrapper.find(Post)).toHaveLength(0)
  //   expect(wrapper.find(Comment)).toHaveLength(0)
  //   expect(wrapper.find(NotFound)).toHaveLength(1)
  // })
})
