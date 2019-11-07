import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {removeFromCart} from '../store/cartReducer'

class Cart extends React.Component {
  render() {
    const cart = this.props.cart ? this.props.cart : []
    return (
      <div className="container">
        <div className="row">
          {cart.map(item => {
            return (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={this.props.removeFromCart}
              />
            )
          })}
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
    removeFromCart: id => dispatch(removeFromCart(id))
  }
}

export default connect(mapState, mapProps)(Cart)
