import React from 'react'
import {Link} from 'react-router-dom'


const ProductCard = props => {
  const {id, name, photoURL, price} = props.product
  return (
    <div className="col-4 card">
      <Link to={`/products/${id}`}>
        <div>
          <div>
            <h3 className="card-title">{name}</h3>
          </div>
          <div>
            <div>
              <img className="card-image-top" src={photoURL} />
            </div>
          </div>
          <div>${price}</div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
