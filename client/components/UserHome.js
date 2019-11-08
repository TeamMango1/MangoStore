import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PasswordReset from './PasswordReset'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, passwordReset} = props

  return (
    <div>
      {passwordReset ? (
        <PasswordReset />
      ) : (
        <div>
          <h3>Welcome, {email}</h3>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    passwordReset: state.user.passwordReset
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
