import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.cart.map(item => {
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
