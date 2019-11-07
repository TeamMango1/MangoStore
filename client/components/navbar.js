import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {fetchCart} from '../store/cartReducer'

class Navbar extends React.Component {
  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    return (
      <div>
        <h1>Mangonificent™ 🍍</h1>
        <nav>
          {this.props.isLoggedIn ? (
            <React.Fragment>
              {/* The navbar will show these links after you log in */}
              {this.props.isAdmin ? (
                <Link to="/adminhub">Manage Site</Link>
              ) : (
                ''
              )}
              <Link to="/products">Products</Link>
              <Link to="/home">Home</Link>

              <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              {this.props.isAdmin ? <Link to="/products">Products</Link>
              :
              <Link to="/products">Products</Link>}
            </React.Fragment>
          )}
          <Link to="/cart">Cart</Link>
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadCart() {
      dispatch(fetchCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
