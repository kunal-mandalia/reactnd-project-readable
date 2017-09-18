import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/InlineEdit.css';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

export class InlineEdit extends Component {
  render () {
    const { placeholder, editMode, value, onChange, className, multiline, autoFocus, link, short } = this.props
    return (
      editMode ? (
        <textarea
          placeholder={placeholder}
          className={`edit-input ${className}`}
          rows={multiline ? '4' : '1'}
          cols={short ? '10' : '50'}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          ref={textarea => textarea && (autoFocus && textarea.focus())}
        />
      ) : (
        <div
          className={`inline-edit-read-only ${className}`}    
        >{link ? <a className='link-push' onClick={this.props.push.bind(null, link)}>{value}</a> : value }</div>
      )
    )
  }
}

InlineEdit.defaultProps = {
  placeholder: '',
  editMode: false,
  multiline: false
}

InlineEdit.propTypes = {
  placeholder: PropTypes.string,
  editMode: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool
}

const mapDispatchToProps = dispatch => ({
  push: link => { dispatch(push(link)) }
})

export default connect(null, mapDispatchToProps)(InlineEdit)
