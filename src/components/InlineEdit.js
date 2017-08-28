import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../styles/InlineEdit.css';

class InlineEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.initialValue,
      editValue: this.props.initialValue,
      editMode: false
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  handleEdit (e) {
    this.setState({
      editValue: e.target.value
    })
  }

  onEdit () { this.setState({ editMode: true }) }

  onSave () {
    this.setState(state => ({
      editMode: false,
      value: state.editValue
    }))
    this.props.onSave(this.state.editValue)
  }

  onCancel () {
    this.setState(state => ({
      editMode: false,
      editValue: state.value
    }))
  }

  onDelete () { this.props.onDelete() }

  render () {
    const node = this.state.editMode ? (
      <div className='inline-edit-editable'>
        <textarea
          id='edit-input'
          rows='4'
          cols='50'
          value={this.state.editValue}
          onChange={this.handleEdit}
          autoFocus
        />
        <div className='actions'>
          <a
            id='save-button'
            className='link-button'
            onClick={this.onSave}
          >save</a>
          <a
            id='cancel-button'
            className='link-button'
            onClick={this.onCancel}
          >cancel</a>
          <a
            id='delete-button'
            className='link-button pull-right'
            onClick={this.onDelete}
          >delete</a>
        </div>
      </div>
    ) : (
      <div className='inline-edit-read-only'>
        <span
          className='inline-edit-read-only'
        >{this.state.value}</span>
        <span>
          <a
            id='edit-button'
            className='link-button pull-right'
            onClick={this.onEdit}
          >edit</a>
        </span>
      </div>
    )

    return (
      <div className='inline-edit'>
        {node}
      </div>
    )
  }
}

InlineEdit.propTypes = {
  initialValue: PropTypes.string,
  onSave: PropTypes.func,
  onDelete: PropTypes.func
}

export default InlineEdit
