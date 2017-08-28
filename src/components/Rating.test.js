import React from 'react'
import { shallow } from 'enzyme'
import Rating from './Rating'
import renderer from 'react-test-renderer'

const mockFnUpvote = jest.fn()
const mockFnDownvote = jest.fn()

const props = {
  rating: 4,
  onUpvote: mockFnUpvote,
  onDownvote: mockFnDownvote,
}

describe(`<Rating .../>`, () => {
  it(`should render rating`, () => {
    const wrapper = shallow(<Rating {...props} />)
    expect(wrapper.find('#rating-value').text()).toContain(props.rating)
  })

  it(`should call increment vote on upvote`, () => {
    const wrapper = shallow(<Rating {...props} />)
    wrapper.find('#upvote-button').simulate('click')
    expect(mockFnUpvote.mock.calls).toHaveLength(1)
    mockFnUpvote.mockClear()
  })

  it(`should call decrement vote on downvote`, () => {
    const wrapper = shallow(<Rating {...props} />)
    wrapper.find('#downvote-button').simulate('click')
    expect(mockFnDownvote.mock.calls).toHaveLength(1)
    mockFnDownvote.mockClear()
  })

  it(`should match snapshot`, () => {
    const tree = renderer.create(<Rating {...props} />)
    expect(tree).toMatchSnapshot()
  })
})
