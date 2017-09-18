import React from 'react'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import configureStore from 'redux-mock-store';
import { initialState } from '../reducers/index'
import createHistory from 'history/createBrowserHistory'
import { mount } from 'enzyme'

// Connect component to store and router
//  useful for testing nested connected containers
export const setup = (component) => {
  const history = createHistory()
  const store = configureStore()({ app: initialState })
  return mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {component}
      </ConnectedRouter>
    </Provider>
  )
}

describe(`setup()`, () => {
  it(`should return a mounted connected component`, () => {
    const node = <h1>simple component</h1>
    const wrapper = setup(node)
    expect(wrapper.find('h1')).toHaveLength(1)
  })
})
