import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {id, name, photoURL, price, availibility} = props.product
  if (availibility) {
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
            <div>${price/100}</div>
          </div>
        </Link>
      </div>
    )
  } else {
    return <div />
  }
}

export default ProductCard
