import React from 'react'
import MetaData from './MetaData'
import renderer from 'react-test-renderer'

const props = {
  date: Date.now(),
  author: `Kunal Mandalia`
}

describe(`<MetaData .../>`, () => {
  it(`should match snapshot`, () => {
    const tree = renderer.create(<MetaData {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
