import React from 'react'
import {Link} from 'react-router-dom'

class CartItem extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.quaitityChange = this.quaitityChange.bind(this)
  }

  componentDidMount() {
    console.log('AAAAAAA:', this.props.item.quantity)
    this.setState({quantity: this.props.item.quantity})
  }

  quaitityChange(event) {
    const value = event.target.value
    this.setState({quantity: value})
  }

  render() {
    const {id, name, photoURL, price} = this.props.item
    const {quantity} = this.state
    return (
      <div className="col-4 card">
        <Link to={`/products/${id}`} className="text-center">
          {name}
        </Link>
        <div>
          <div className="text-center">
            <img
              className="card-image-top img-thumbnail cart-image"
              src={photoURL}
            />
          </div>
          <div className="text-center">${price / 100}</div>
          <input
            type="number"
            min="1"
            className="text-center"
            value={quantity}
          ></input>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.props.removeFromCart(id)}
            >
              Remove From Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CartItem
