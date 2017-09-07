import React from 'react'
import PropTypes from 'prop-types'
import '../styles/InlineEdit.css';

const InlineEdit = ({ placeholder, editMode, value, onChange, className, multiline, autoFocus }) => (
  editMode ? (
    <textarea
      placeholder={placeholder}
      className={`edit-input ${className}`}
      rows={multiline ? '4' : '1'}
      cols='50'
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      ref={textarea => textarea && (autoFocus && textarea.focus())}
    />
  ) : (
    <div
      className={`inline-edit-read-only ${className}`}    
    >{value}</div>
  )
)

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

export default InlineEdit
