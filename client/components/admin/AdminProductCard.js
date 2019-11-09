import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeProduct} from '../../store/allProductsReducer'

const AdminProductCard = props => {
  const {id, name, photoURL, price, availibility} = props.product
  if (availibility) {
    return (
      <div className="col-4 card">
        <Link to={`/adminhub/products/${id}`}> {name}</Link>
        <div>
          <div>
            <img src={photoURL} />
          </div>
        </div>
        <div>${price}</div>
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
  } else {
    return <div />
  }
}

const mapDeleteDispatch = dispatch => ({
  delete: id => dispatch(removeProduct(id))
})

export default connect(null, mapDeleteDispatch)(AdminProductCard)
