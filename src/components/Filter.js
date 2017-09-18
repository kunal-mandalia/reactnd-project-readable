import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import '../styles/Filter.css'

export class Filter extends Component {
  render () {
    const { pathname, categories, push } = this.props
    const category = pathname.split('/').length > 1 ?  pathname.split('/')[1] : ''
    return (
      <div className='filter'>
        <span>
          <span
            className={`filter-category ${category === '' ? 'active' : 'inactive'}`}
            onClick={push.bind(null, `/`)}> everything
          </span>
          <span className='filter-separator'> | </span>
        </span>
        {categories.map((c, i, categories) => (
          <span key={c.path}>
            <span
              className={`filter-category ${category === c.path ? 'active' : 'inactive'}`}
              onClick={push.bind(null, `/${c.path}`)}>{c.name}</span>
            <span className='filter-separator'>{i < categories.length - 1 ? ' | ' : ''}</span>
          </span>
        ))}
      </div>
    )
  }
}

Filter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = state => ({
  categories: state.app.categories,
  pathname: state.router.location.pathname
})

const mapDispatchToProps = dispatch => ({
  push: link => dispatch(push(link))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
