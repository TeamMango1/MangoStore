import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { removeProduct } from '../../store/allProductsReducer'


const AdminProductCard = props => {
  const {id, name, photoURL, categories, price} = props.product

  return (
    <div className="col-4 card">
      <Link to={`/adminhub/products/${id}`}> {name}</Link>
      <div>
        <div>
          <img src={photoURL} />
        </div>
      </div>
      <div>${price}</div>
      <div>Category: {categories[0].name}</div>
      <div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.delete(id)}
        >
          {' '}
          Remove Product{' '}
        </button>
      </div>
    </div>
  )
}

const mapDeleteDispatch = dispatch => ({
  delete: id => dispatch(removeProduct(id))
})

export default connect(null, mapDeleteDispatch)(AdminProductCard)
