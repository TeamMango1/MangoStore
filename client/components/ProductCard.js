import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const ProductCard = props => {
  const {id, name, photoURL, categories, price} = props.product

  return (
    <div>
      <Link to={`/products/${id}`}>
        <div>
          <div>
            <h3>{name}</h3>
          </div>
          <div>
            <div>
              <img src={photoURL} />
            </div>
          </div>
          <div>${price}</div>
          <div>Category: {categories[0].name}</div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
