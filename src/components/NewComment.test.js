import React from 'react'
import { NewComment } from './NewComment'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

const mockFnOnSave = jest.fn()
const mockFnOnCancel = jest.fn()

const props = {
  parentId: `8tu4bsun805n8un48ve89`,
  onSave: mockFnOnSave,
  onCancel: mockFnOnCancel,
  newComment: {
    show: false,
    parentId: `8tu4bsun805n8un48ve89`
  }
}

describe(`<NewComment .../>`, () => {
  it(`should start hidden`, () => {
    const wrapper = mount(<NewComment {...props} />)
    expect(wrapper.find('.hidden')).toHaveLength(1)
  })

  it(`should match snapshot`, () => {
    const tree = renderer.create(<NewComment {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
