import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Filter from './Filter'
import User from './User'
import { setUser } from '../actions/index'

import '../styles/NavbarContainer.css'

export class NavbarContainer extends Component {
  render () {
    return (
      <div className='navbar'>
        <span className='navbar-logo' onClick={() => { this.props.push('/') }}> readable </span>
        <span className='navbar-categories'>
          <Filter />
        </span>
        <User />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  push: link => dispatch(push(link)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)