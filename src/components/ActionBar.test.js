import React from 'react'
import ActionBar from './ActionBar'
import renderer from 'react-test-renderer'

const props = {
  author: `Kunal Mandalia`,
  editBody: `editBody`,
  date: Date.now(),
  editMode: false,
}

describe(`<ActionBar .../>`, () => {
  it(`should match snapshot`, () => {
    const tree = renderer.create(<ActionBar {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
