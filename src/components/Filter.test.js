import React from 'react'
import { Filter } from './Filter'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
// import { setup } from '../helper/setup.test'

const mockFnPush = jest.fn()
const props = {
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
  pathname: `/`,
  push: mockFnPush,
}

describe(`<Filter .../>`, () => {
  it(`should render ${props.categories.length + 1} categories`, () => {
    const wrapper = shallow(<Filter {...props} />)
    expect(wrapper.find('.filter-category')).toHaveLength(props.categories.length + 1)
  })

  it(`should call filterByCategory when clicking on a category`, () => {
    const wrapper = shallow(<Filter {...props} />)
    wrapper.find('.filter-category').first().simulate('click')
    expect(mockFnPush.mock.calls).toHaveLength(1)    
  })

  it(`should match snapshot`, () => {
    const tree = renderer.create(<Filter {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
