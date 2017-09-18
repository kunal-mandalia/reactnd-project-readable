import React from 'react'
import { PostsContainer } from './PostsContainer'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

const posts = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false 
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  }
}

const comments = {
  '894tuq4ut84ut8v4t8wun89g': { 
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false 
  },
  '8tu4bsun805n8un48ve89': {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
}

const mockFn = jest.fn()
const props = {
  sort: { by: 'votes', descending: true },
  editPost: mockFn,
  deletePost: mockFn,
  beginEditPost: mockFn,
  beginEditComment: mockFn,
  endEditComment: mockFn,
  editComment: mockFn,
  deleteComment: mockFn,
  votePost: mockFn,
  voteComment: mockFn,
  newCommentShow: mockFn,
}

const updates = {}

describe(`PostsContainer`, () => {
  const wrapper = shallow(<PostsContainer posts={posts} comments={comments} updates={updates} {...props} />)
  it(`should render ${Object.keys(posts).length} post(s)`, () => {
    expect(wrapper.find('Post')).toHaveLength(Object.keys(posts).length)
  })

  it(`should render ${Object.keys(comments).length} comment(s)`, () => {
    expect(wrapper.find('Comment')).toHaveLength(Object.keys(comments).length)
  })
})
