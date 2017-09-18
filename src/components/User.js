import React, { Component } from 'react'
import { connect } from 'react-redux'
import InlineEdit from './InlineEdit'
import { setUser } from '../actions/index'

import '../styles/User.css'

export class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      editUser: props.user,
      editMode: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
  }

  toggleEditMode () {
    this.setState(state => ({ editMode: !state.editMode }))
  }

  onChange (e) {
    this.setState({ editUser: e.target.value })
  }

  onSave () {
    this.props.setUser(this.state.editUser)
    debugger
    this.setState(state => ({
      user: state.editUser,
      editMode: false
    }))
  }

  onCancel () {
    this.setState(state => ({
      editUser: state.user,
      editMode: false
    }))
  }

  render () {
    const { user, editUser, editMode } = this.state
    return (
      <span className={`navbar-user ${editMode ? 'navbar-user-editmode' : ''}`}>
        hello,
        <span className='navbar-user-editcontrol'>
          <InlineEdit
            placeholder={`Impersonate a user`}
            editMode={editMode}
            value={editUser}
            onChange={this.onChange}
            short
            className={editMode ? 'light-mode' : ''}
          />
        </span>
        <span className={`navbar-user-actions`}>
          {editMode ? (
            <span>
              <a className='navbar-user-action' onClick={this.onSave}>[ save ]</a>
              {' '}
              <a className='navbar-user-action' onClick={this.toggleEditMode}>[ cancel ]</a>
            </span>
          ) : (
            <span>
              <a className='navbar-user-action' onClick={this.toggleEditMode}>[ impersonate ]</a>
            </span>
          )}
        </span>
      </span>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.app.categories,
  user: state.app.user
})

const mapDispatchToProps = dispatch => ({
  setUser: username => dispatch(setUser(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)