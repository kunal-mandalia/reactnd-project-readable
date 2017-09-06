import React from 'react'
import PropTypes from 'prop-types'
import '../styles/ActionBar.css'
import { friendlyDurationSince } from '../helper/functions'

const ActionBar = ({
  id,
  editTitle,
  editBody,
  date,
  author,
  category,
  hideCategory,
  editMode,
  onCancel,
  onDelete,
  onEdit,
  onSave,
  onReply,
}) => {
  const since = friendlyDurationSince(Date.now(), date)
  return (
    <div className='action-bar'>
      <hr className='action-bar-separator'/>
      <span className='action-bar-date'> {since} </span>
      <span className='action-bar-author'> by {author} </span>
      <span className={hideCategory ? 'hidden' : 'action-bar-category'}> in {category} </span>
      {editMode ? (
        <span className='action-bar-actions'>
          [ 
            <a className='action-bar-action' onClick={() => { onSave(id, editTitle, editBody) }}> save </a> | 
            <a className='action-bar-action' onClick={() => { onDelete(id) }}> delete </a> | 
            <a className='action-bar-action' onClick={() => { onCancel(id) }}> cancel </a>
          ]
        </span>
      ) : (
        <span className='action-bar-actions'>
          [
            <a className='action-bar-action' onClick={() => { onEdit(id) }}> edit </a> | 
            <a className='action-bar-action' onClick={onReply}> reply </a>
          ]
        </span>
      )}
    </div>
  )
}

ActionBar.defaultProps = {
  editMode: false,
}

ActionBar.propTypes = {
  id: PropTypes.string,
  editTitle: PropTypes.string,
  editBody: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string,
  hideCategory: PropTypes.bool,
  editMode: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
  onReply: PropTypes.func,
}

export default ActionBar
