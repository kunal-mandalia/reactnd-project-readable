import React from 'react'
import Post from './Post'
import { shallow } from 'enzyme'

const mockFnOnUpvote = jest.fn()
const mockFnOnDownvote = jest.fn()
const mockFnOnSave = jest.fn()
const mockFnOnDelete = jest.fn()

const props = {
  rating: 5,
  author: 'Kunal Mandalia',
  date: Date.now(),
  body: 'Contents of post',
  onUpvote: mockFnOnUpvote,
  onDownvote: mockFnOnDownvote,
  onSave: mockFnOnSave,
  onDelete: mockFnOnDelete
}

describe(`<Post .../>`, () => {
  const wrapper = shallow(<Post {...props} />)

  it(`should render <Rating .../> component`, () => {
    expect(wrapper.find('Rating')).toHaveLength(1)
  })

  it(`should render <InlineEdit .../> component`, () => {
    expect(wrapper.find('InlineEdit')).toHaveLength(1)
  })

  it(`should render <MetaData .../> component`, () => {
    expect(wrapper.find('MetaData')).toHaveLength(1)
  })
})