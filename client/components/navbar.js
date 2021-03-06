import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {fetchCart} from '../store/cartReducer'
import {fetchProducts} from '../store/allProductsReducer'

class Navbar extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.loadCart()
  }
  
  handleClick() {
    this.props.loadProducts(1)
    // this.props.history.push(`/products?page=1`)
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <h1 className="navbar-brand">Mangonificent™ 🥭</h1>
          <div className="navbar-nav">
            {this.props.isLoggedIn ? (
              <React.Fragment>
                {/* The navbar will show these links after you log in */}
                {this.props.isAdmin ? (
                  <div className="nav-item">
                    <Link className="nav-link" to="/adminhub/products?page=1">
                      Manage Site
                    </Link>
                  </div>
                ) : (
                  ''
                )}
                <div className="nav-item">
                  <Link
                    className="nav-link"
                    to="/products?page=1"
                    onClick={this.handleClick}
                  >
                    Products
                  </Link>
                </div>
                <div className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </div>
                <a
                  className="nav-link"
                  href="#"
                  onClick={this.props.handleClick}
                >
                  Logout
                </a>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* The navbar will show these links before you log in */}
                <div className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </div>
                <div className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </div>
                <div className="nav-item">
                  <Link
                    to="/products?page=1"
                    className="nav-link"
                    onClick={this.handleClick}
                  >
                    Products
                  </Link>
                </div>
              </React.Fragment>
            )}
            <div className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </div>
          </div>
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
    async handleClick() {
      await dispatch(logout())
      dispatch(fetchCart())
    },
    loadCart() {
      dispatch(fetchCart())
    },
    loadProducts(pageNumber) {
      dispatch(fetchProducts(pageNumber))
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
