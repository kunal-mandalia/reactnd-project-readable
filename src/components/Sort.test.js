import React from 'react'
import { Sort } from './Sort'
import { shallow } from 'enzyme'

const mockFnSortByDate = jest.fn()
const mockFnSortByVotes = jest.fn()
const props = {
  sortBy: 'votes',
  sortDescending: true,
  sortByDate: mockFnSortByDate,
  sortByVotes: mockFnSortByVotes
}

describe(`<Sort ...>`, () => {
  it(`should call sort by date`, () => {
    const wrapper = shallow(<Sort {...props} />)
    wrapper.find('.sort-by-date').simulate('click')
    expect(mockFnSortByDate.mock.calls).toHaveLength(1)
  })

  it(`should call sort by votes`, () => {
    const wrapper = shallow(<Sort {...props} />)
    wrapper.find('.sort-by-votes').simulate('click')
    expect(mockFnSortByVotes.mock.calls).toHaveLength(1)
  })
})
