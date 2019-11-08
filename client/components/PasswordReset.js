import React from 'react'

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
    if (this.state.pass1 !== this.state.pass2) {
      alert('passwords must match')
    }
  }
  render() {
    return (
      <div>
        <div>Password Reset</div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="password1">
            <small>Enter new password: </small>
          </label>
          <input
            name="password1"
            type="password"
            defaultValue={this.state.pass1}
            onChange={this.pass1HandleChange}
          />
          <label htmlFor="password2">
            <small>Enter password again: </small>
          </label>
          <input
            name="password2"
            type="password"
            defaultValue={this.state.pass2}
            onChange={this.pass2HandleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default PasswordReset
