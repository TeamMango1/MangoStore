import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const ProductsList = props => {
  const {id, name, photoURL, price} = props.product
  return (
    <div>
      <div>
        <Link to={`/products/${id}`}>
          <h3>{name}</h3>
        </Link>
      </div>
      <div>
        <div>
          <img src={photoURL} />
        </div>
      </div>
      <div>${price}</div>
    </div>
  )
}

export default ProductsList
