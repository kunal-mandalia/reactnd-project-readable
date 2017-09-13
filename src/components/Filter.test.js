import React from 'react'
import { Filter } from './Filter'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

const mockFnOnFilter = jest.fn()
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
  filterByCategory: mockFnOnFilter,
  filter: ``
}

describe(`<Filter .../>`, () => {
  it(`should render ${props.categories.length + 1} categories`, () => {
    const wrapper = shallow(<Filter {...props} />)
    expect(wrapper.find('.filter-category')).toHaveLength(props.categories.length + 1)
  })

  it(`should call filterByCategory when clicking on a category`, () => {
    const wrapper = shallow(<Filter {...props} />)
    wrapper.find('.filter-category').first().simulate('click')
    expect(mockFnOnFilter.mock.calls).toHaveLength(1)    
  })

  it(`should match snapshot`, () => {
    const tree = renderer.create(<Filter {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
