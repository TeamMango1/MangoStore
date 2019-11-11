import React from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import CartItem from './CartItem'
import {removeFromCart, fetchCart} from '../store/cartReducer'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleToken = this.handleToken.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }

  handleToken(token, addresses) { // paid for
    console.log(token, addresses)



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
        <br/>
        <div className = "d-flex justify-content-center">
          <StripeCheckout
            stripeKey="pk_test_kZmJSR4cNZc7FGBq3pfyRkaH00UmOKDepu"
            token={this.handleToken}
            amount={cartTotal}
            name="Your Cart"
            billingAddress
            shippingAddress
          />
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
    getCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapProps)(Cart)
