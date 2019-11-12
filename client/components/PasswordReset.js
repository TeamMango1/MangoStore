import React from 'react'
import {connect} from 'react-redux'
import {resetPassword} from '../store/allUsers'
import {withRouter} from 'react-router'

class PasswordReset extends React.Component {
  constructor() {
    super()
    this.state = {
      pass1: '',
      pass2: ''
    }
    this.pass1HandleChange = this.pass1HandleChange.bind(this)
    this.pass2HandleChange = this.pass2HandleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  pass1HandleChange(evt) {
    this.setState({
      pass1: evt.target.value
    })
  }
  pass2HandleChange(evt) {
    this.setState({
      pass2: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.pass1 === '' || this.state.pass2 === '') {
      alert('please complete all fields')
    } else if (this.state.pass1 !== this.state.pass2) {
      alert('passwords must match')
    } else {
      this.props.resetPassword(this.props.id, this.state.pass1)
      this.props.history.push('/products?page=1')
    }
  }
  render() {
    return (
      <div>
        <div className="ml-5 mb-4">
          Please reset your password before continuing-
        </div>
        <form onSubmit={this.handleSubmit}>
          <label className="ml-5 mr-2" htmlFor="password1">
            <div>Enter new password: </div>
          </label>
          <input
            name="password1"
            type="password"
            defaultValue={this.state.pass1}
            onChange={this.pass1HandleChange}
          />
          <br />
          <label className="ml-5 mr-2" htmlFor="password2">
            <div>Enter password again: </div>
          </label>
          <input
            name="password2"
            type="password"
            defaultValue={this.state.pass2}
            onChange={this.pass2HandleChange}
          />
          <input className="ml-2" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    id: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    resetPassword: (id, password) => dispatch(resetPassword(id, password))
  }
}

export default withRouter(connect(mapState, mapDispatch)(PasswordReset))
