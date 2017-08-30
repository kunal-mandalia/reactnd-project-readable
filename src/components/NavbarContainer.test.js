import React from 'react'
import { NavbarContainer } from './NavbarContainer'
import { shallow } from 'enzyme'

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
  ]
}

describe(`<NavbarContainer .../>`, () => {
  it(`should render ${props.categories.length} categories`, () => {
    const wrapper = shallow(<NavbarContainer {...props} />)
    expect(wrapper.find('.navbar-category')).toHaveLength(props.categories.length)
  })
})
