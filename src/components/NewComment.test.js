import React from 'react'
import { NewComment } from './NewComment'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import mockStore  from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { initialState } from '../reducers/index'

const store = mockStore()(initialState)

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
  let wrappedComponent
  beforeEach(() => {
    wrappedComponent = <Provider store={store}><NewComment {...props} /></Provider>
  })

  it(`should start hidden`, () => {
    const wrapper = mount(wrappedComponent)
    expect(wrapper.find('.hidden')).toHaveLength(1)
  })

  it(`should match snapshot`, () => {
    const tree = renderer.create(wrappedComponent).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
