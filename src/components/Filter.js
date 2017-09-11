import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterByCategory } from '../actions/index'

export class Filter extends Component {
  render () {
    const { filter, categories, filterByCategory } = this.props
    return (
      <div className='filter'>
        {categories.map(c => (
          <div key={c.path}>
            <div
              className={`category ${filter === c.path ? 'active' : 'inactive'}`}
              onClick={filterByCategory.bind(null, c.path)}>{c.name}</div>
          </div>
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
  filter: state.filter
})

const mapDispatchToProps = dispatch => ({
  filterByCategory: category => dispatch(filterByCategory(category))
})

export default Filter
