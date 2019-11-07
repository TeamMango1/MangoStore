import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  const {id, name, photoURL, price} = props.item
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
        <div className="text-center">${price}</div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => props.removeFromCart(id)}
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
