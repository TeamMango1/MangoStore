import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {fetchCart} from '../store/cartReducer'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <div className="mx-5">Email:</div>
          </label>
          <input className="ml-4" name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <div className="mx-5">Password:</div>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button className="ml-5" type="submit">
            {displayName}
          </button>
        </div>
        {error &&
          error.response && <div className="ml-5"> {error.response.data} </div>}
      </form>
      <a href="/auth/google" className="ml-5">
        {displayName} with Google
      </a>
    </div>
  )
}

const SignupForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small className="mx-5">Email:</small>
          </label>
          <input name="email" type="text" />
        </div>
        <React.Fragment>
          <div>
            <label htmlFor="firstname">
              <small className="mx-5">First Name:</small>
            </label>
            <input name="firstname" type="text" />
          </div>
          <div>
            <label htmlFor="lastname">
              <small className="mx-5">Last Name:</small>
            </label>
            <input name="lastname" type="text" />
          </div>
        </React.Fragment>
        <div>
          <label htmlFor="password">
            <small className="mx-5">Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button className="mx-5" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google" className="mx-5">
        {displayName} with Google
      </a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    cart: state.cart
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    cart: state.cart
  }
}

const mapDispatchLogin = dispatch => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      await dispatch(auth(email, password, formName))
      await dispatch(fetchCart())
    }
  }
}

const mapDispatchSignup = dispatch => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstname = evt.target.firstname.value
      const lastname = evt.target.lastname.value
      await dispatch(auth(email, password, formName, firstname, lastname))
      await dispatch(fetchCart())
    }
  }
}

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignup)(SignupForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
