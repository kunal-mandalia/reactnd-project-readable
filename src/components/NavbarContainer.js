import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/NavbarContainer.css'
import Filter from './Filter'

export class NavbarContainer extends Component {
  render () {
    return (
      <div className='navbar'>
        <span className='navbar-logo'>readable </span>
        <span className='navbar-categories'>
          <Filter />
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)