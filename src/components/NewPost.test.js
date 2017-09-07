import React from 'react'
import { shallow, mount } from 'enzyme'
import { NewPost } from './NewPost'

const mockFnOnCreatePost = jest.fn()

const props = {
  categories: {},
  createPost: mockFnOnCreatePost,
  newPost: {}
}

describe(`<NewPost .../>`, () => {
  it(`should be hidden with default props`, () => {
    const wrapper = mount(<NewPost {...props} />)
    expect(wrapper.find('.new-post-collapsed')).toHaveLength(1)
  })

  it(`should update title and body state onChange`, () => {
    const wrapper = mount(<NewPost {...props} />)
    const newTitle = 'newTitle'
    const newBody = 'newBody'
    wrapper.find('.add-new-post').simulate('click')
    wrapper.update()
    wrapper.find('.input-title').simulate('change', {target: {value: newTitle}})
    wrapper.update()
    expect(wrapper.state().title).toEqual(newTitle)

    wrapper.find('.input-body').simulate('change', {target: {value: newBody}})
    wrapper.update()
    expect(wrapper.state().body).toEqual(newBody)
  })
})
