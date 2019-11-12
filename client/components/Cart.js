import React from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import CartItem from './CartItem'
import {removeFromCart, fetchCart, checkoutCart} from '../store/cartReducer'

const addressToString = add => {
  const {
    shipping_address_city,
    shipping_address_country,
    shipping_address_country_code,
    shipping_address_line1,
    shipping_address_state,
    shipping_name,
    billing_address_city,
    billing_address_country,
    billing_address_country_code,
    billing_address_line1,
    billing_address_state,
    billing_name
  } = add
  const shipping = `${shipping_name}\n${shipping_address_line1}\n${shipping_address_city} ${shipping_address_state}\n${shipping_address_country_code}`
  const billing = `${billing_name}\n${billing_address_line1}\n${billing_address_city} ${shipping_address_state}\n${shipping_address_country_code}`
  return {shipping, billing}
}

class Cart extends React.Component {
  constructor() {
    super()
    this.handleToken = this.handleToken.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }

  handleToken(token, addresses) {
    // paid for
    // console.log(token, addresses)
    const shipping = addressToString(addresses).shipping
    console.log("SHIPPING:\t",shipping)
    this.props.checkout(shipping, token.email)
  }

  render() {
    let cartTotal = 0
    const cart = this.props.cart ? this.props.cart : []
    return (
      <div className="container">
        <div className="row">
          {cart.map(item => {
            cartTotal += item.price
            return (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={this.props.removeFromCart}
              />
            )
          })}
        </div>
        <br />
        <div className="d-flex justify-content-center">
          {cart.length ? (
            <StripeCheckout
              stripeKey="pk_test_kZmJSR4cNZc7FGBq3pfyRkaH00UmOKDepu"
              token={this.handleToken}
              amount={cartTotal}
              name="Your Cart"
              billingAddress
              shippingAddress
            />
          ) : (
            <h2>Your cart is empty... buy our mangos</h2>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapProps = dispatch => {
  return {
    removeFromCart: id => dispatch(removeFromCart(id)),
    getCart: () => dispatch(fetchCart()),
    checkout: (address,email) => dispatch(checkoutCart(address,email))
  }
}

export default connect(mapState, mapProps)(Cart)
