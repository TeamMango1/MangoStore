import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {id, name, photoURL, price, availibility} = props.product
  if (availibility) {
    return (
      <div className="col-4 card">
        <div>
          <h3 className="card-title text-center mt-2">{name}</h3>
        </div>
        <Link to={`/products/${id}`}>
          <div>
            <div>
              <div>
                <img className="card-image-top" src={photoURL} />
              </div>
            </div>
          </div>
        </Link>
        <h3 className="text-center">${price}</h3>
      </div>
    )
  } else {
    return <div />
  }
}

export default ProductCard
