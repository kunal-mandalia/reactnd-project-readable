import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import InlineEdit from './InlineEdit'

const mockOnSave = jest.fn()
const mockOnDelete = jest.fn()

const props = {
  initialValue: `I'm a post`,
  onSave: mockOnSave,
  onDelete: mockOnDelete
}

describe(`<InlineEdit .../>`, () => {
  it(`should initialise read only mode`, () => {
    const wrapper = shallow(<InlineEdit {...props} />)
    expect(wrapper.state().editMode).toBeFalsy()
  })

  it(`should change to edit mode when edit button clicked`, () => {
    const wrapper = mount(<InlineEdit {...props} />)
    wrapper.find('#edit-button').simulate('click')
    expect(wrapper.state().editMode).toBeTruthy()
  })

  it(`should update value in edit mode on save`, () => {
    const newValue = `I am updated`
    const wrapper = mount(<InlineEdit {...props} />)
    wrapper.find('#edit-button').simulate('click')
    wrapper.find('#edit-input').simulate('change', {target: {value: newValue}})
    wrapper.find('#save-button').simulate('click')
    expect(mockOnSave.mock.calls[0][0]).toBe(newValue)
  })

  it(`should call delete prop on delete`, () => {
    const wrapper = mount(<InlineEdit {...props} />)
    wrapper.find('#edit-button').simulate('click')
    wrapper.find('#delete-button').simulate('click')
    expect(mockOnDelete.mock.calls).toHaveLength(1)
  })

  it(`should match snapshot`, () => {
    const tree = renderer.create(<InlineEdit {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
