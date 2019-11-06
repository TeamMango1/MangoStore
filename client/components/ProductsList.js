import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const ProductsList = props => {
  const {id, name, photoURL, price} = props.product
  return (
    <div>
      <Link to={`/products/${id}`}>
        <div>
          <h3>{name}</h3>
        </div>
        <div>
          <div>
            <img src={photoURL} />
          </div>
        </div>
        <div>${price}</div>
      </Link>
    </div>
  )
}

export default ProductsList
