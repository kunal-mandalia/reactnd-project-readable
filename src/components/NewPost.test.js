import React from 'react'
import { shallow, mount } from 'enzyme'
import { NewPost } from './NewPost'
import { setup } from '../helper/setup.test'
const mockFnOnCreatePost = jest.fn()

const props = {
  categories: {},
  newPost: {},
  createPost: mockFnOnCreatePost,
}

describe(`<NewPost .../>`, () => {
  it(`should be hidden with default props`, () => {
    const wrapper = setup(<NewPost {...props} />)
    expect(wrapper.find('.new-post-collapsed')).toHaveLength(1)
  })
})
