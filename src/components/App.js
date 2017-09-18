import React, { Component } from 'react';
import '../styles/App.css';
import PostsContainer from './PostsContainer'
import { fetchInitialData } from '../actions/index'
import { connect } from 'react-redux'
import NavbarContainer from './NavbarContainer'
import ThreadContainer from './ThreadContainer'
import Sort from './Sort'
import NewPost from './NewPost'
import NotFound from './NotFound'
import { Switch, Route } from 'react-router-dom'

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
        <Switch>
          <Route exact path='/' component={() => <ThreadContainer filterBy='none' />} />
          <Route exact path='/:category' component={() => <ThreadContainer filterBy='category' id={'/:category'} />} />
          <Route exact path='/:category/:postId' component={() => <ThreadContainer filterBy='post' id={'/:postId'} />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(null, mapDispatchToProps, null, { pure: false })(App)
