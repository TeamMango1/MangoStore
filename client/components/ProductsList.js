import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const ProductsList = props => {
  const {id, name, photoURL, Price} = props.product
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
      <div>${Price}</div>
    </div>
  )
}

export default ProductsList
