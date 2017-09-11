import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sortByDate, sortByVotes } from '../actions/index'

export class Sort extends Component {
  onSortByDate = () => {
    if (this.props.sortBy === 'date') {
      // toggle sort if already sorted by date
      this.props.sortByDate(!this.props.sortDescending)
    } else {
      this.props.sortByDate(this.props.sortDescending)
    }
  }

  onSortByVotes = () => {
    if (this.props.sortBy === 'votes') {
      this.props.sortByVotes(!this.props.sortDescending)
    } else {
      this.props.sortByVotes(this.props.sortDescending)
    }
  }

  render () {
    const { sortBy, sortDescending } = this.props
      return (
        <div className='sort'>
          Sort by [ 
            <a className={`sort-by-date`} onClick={this.onSortByDate}> date </a> | 
            <a className={`sort-by-votes`} onClick={this.onSortByVotes}> votes </a>
          ]
        </div>
      )
  }
}

Sort.propTypes = {
  sortBy: PropTypes.string,
  sortDescending: PropTypes.bool,
  sortByDate: PropTypes.func.isRequired,
  sortByVotes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  sortBy: state.sort.by,
  sortDescending: state.sort.descending
})

const mapDispatchToProps = dispatch => ({
  sortByDate: descending => dispatch(sortByDate(descending)),
  sortByVotes: descending => dispatch(sortByVotes(descending))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sort)
