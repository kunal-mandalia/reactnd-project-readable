import React, { Component } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import '../styles/NavbarContainer.css'

export class NavbarContainer extends Component {
  render () {
    return (
      <div className='navbar'>
        <span className='navbar-logo'>readable </span>
        <span className='navbar-categories'>
          <Filter />
        </span>
        <span className='navbar-user'>Hello, {this.props.user}</span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  user: state.user
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)