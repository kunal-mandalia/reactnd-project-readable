import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { InlineEdit } from './InlineEdit'
import { setup } from '../helper/setup.test'

const mockOnSave = jest.fn()
const mockOnDelete = jest.fn()
const mockOnChange = jest.fn()

const props = {
  value: `I'm a post`,
  editMode: false,
  onChange: mockOnChange,
  onSave: mockOnSave,
  onDelete: mockOnDelete
}

describe(`<InlineEdit .../>`, () => {
  it(`should initialise read only mode`, () => {
    const wrapper = setup(<InlineEdit {...props} />)
    expect(wrapper.find(InlineEdit).props().editMode).toBeFalsy()
  })

  it(`should match snapshot`, () => {
    const tree = renderer.create(<InlineEdit {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
