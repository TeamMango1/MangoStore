import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render() {
    console.log(this.props.cart)
    const cart = this.props.cart? this.props.cart:[]
    return (
      <div>
        <ul>
          {cart.map(item => {
            return <li key={item.id}>{item.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapState)(Cart)
