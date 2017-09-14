import React, { Component } from 'react';
import '../styles/App.css';
import PostsContainer from './PostsContainer'
import { fetchInitialData } from '../actions/index'
import { connect } from 'react-redux'
import NavbarContainer from './NavbarContainer'
import Sort from './Sort'
import NewPost from './NewPost'

// TODO: refactor using react router as per https://github.com/kunal-mandalia/reactnd-project-myreads/blob/master/src/components/App.js
export class App extends Component {
  componentDidMount () {
    this.props.dispatch(fetchInitialData())
  }

  render() {
    return (
      <div className="App">
        <NavbarContainer />
        <div className='app-actions'>
          <Sort />
          <NewPost />
        </div>
        <PostsContainer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(App)
