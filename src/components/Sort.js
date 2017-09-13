import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sortByDate, sortByVotes } from '../actions/index'
import '../styles/Sort.css'
import ChevronUp from 'react-icons/lib/fa/chevron-up'
import ChevronDown from 'react-icons/lib/fa/chevron-down'

const getSortIcon = ({ sortOption, sortBy, sortDescending }) => {
  const size = 12
  const style = {verticalAlign: 'baseline'}

  if (sortOption === sortBy) {
    if (sortDescending) {
      return <ChevronDown size={size} style={style} />
    } else {
      return <ChevronUp size={size} style={style} />
    }
  } else {
    return <span />
  }
}
  // <ChevronUp size={12} style={{verticalAlign: 'baseline'}} />

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
    const dateIcon = getSortIcon({ sortOption: 'date', sortBy, sortDescending })
    const votesIcon = getSortIcon({ sortOption: 'votes', sortBy, sortDescending })
      return (
        <div className='sort'>
          Sort by [{' '}
            <a
              className={`sort-option sort-by-date ${sortBy === 'date' ? 'sort-by-active' : 'sort-by-inactive'}`}
              onClick={this.onSortByDate}>{dateIcon} Date</a>
              {' '}|{' '} 
            <a
              className={`sort-option sort-by-votes ${sortBy === 'votes' ? 'sort-by-active' : 'sort-by-inactive'}`}
              onClick={this.onSortByVotes}>{votesIcon} Votes</a> 
          {' '}]
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
