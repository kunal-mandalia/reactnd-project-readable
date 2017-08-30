import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/NavbarContainer.css'

export class NavbarContainer extends Component {
  render () {
    return (
      <div className='navbar'>
        <span className='navbar-logo'>readable </span>
        <span className='navbar-categories'>
          {this.props.categories.map(((c,i,categories) => (
            <span key={c.path}>
              <span key={c.path} className='navbar-category'>{c.name}</span>
              {i < categories.length - 1 ? <span className='navbar-category-separator'>/</span> : ''}
            </span>
          )))}
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