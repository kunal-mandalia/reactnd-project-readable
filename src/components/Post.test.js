import React from 'react'
import Post from './Post'
import { shallow } from 'enzyme'

const mockFnOnUpvote = jest.fn()
const mockFnOnDownvote = jest.fn()
const mockFnOnSave = jest.fn()
const mockFnOnDelete = jest.fn()

const props = {
  id: '6ni6ok3ym7mf1p33lnez',
  timestamp: 1468479767190,
  title: 'Learn Redux in 10 minutes!',
  body: 'Just kidding. It takes more than 10 minutes to learn technology.',
  author: 'thingone',
  category: 'redux',
  voteScore: -5,
  deleted: false,
  onVoteUp: mockFnOnUpvote,
  onVoteDown: mockFnOnDownvote,
  onSave: mockFnOnSave,
  onDelete: mockFnOnDelete
}

describe(`<Post .../>`, () => {
  const wrapper = shallow(<Post {...props} />)

  it(`should render <Rating .../> component`, () => {
    expect(wrapper.find('Rating')).toHaveLength(1)
  })

  it(`should render two <InlineEdit .../> components for title, body`, () => {
    expect(wrapper.find('InlineEdit')).toHaveLength(2)
  })

  it(`should render <ActionBar .../> component`, () => {
    expect(wrapper.find('ActionBar')).toHaveLength(1)
  })
})