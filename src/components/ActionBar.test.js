import React from 'react'
import ActionBar from './ActionBar'
import renderer from 'react-test-renderer'

const props = {
  date: Date.now(),
  author: `Kunal Mandalia`
}

describe(`<ActionBar .../>`, () => {
  it(`should match snapshot`, () => {
    const tree = renderer.create(<ActionBar {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
