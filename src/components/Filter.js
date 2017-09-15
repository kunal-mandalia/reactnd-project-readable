import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterByCategory } from '../actions/index'
import '../styles/Filter.css'

export class Filter extends Component {
  render () {
    const { filter, categories = [], filterByCategory } = this.props
    return (
      <div className='filter'>
        <span>
          <span
            className={`filter-category ${filter === '' ? 'active' : 'inactive'}`}
            onClick={filterByCategory.bind(null, '')}> everything
          </span>
          <span className='filter-separator'> | </span>
        </span>
        {categories.map((c, i, categories) => (
          <span key={c.path}>
            <span
              className={`filter-category ${filter === c.path ? 'active' : 'inactive'}`}
              onClick={filterByCategory.bind(null, c.path)}>{c.name}</span>
            <span className='filter-separator'>{i < categories.length - 1 ? ' | ' : ''}</span>
          </span>
        ))}
      </div>
    )
  }
}

Filter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterByCategory: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  categories: state.categories,
  filter: state.filter
})

const mapDispatchToProps = dispatch => ({
  filterByCategory: category => dispatch(filterByCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
