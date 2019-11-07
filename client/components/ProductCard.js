import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeProduct} from '../store/allProductsReducer'


const ProductCard = props => {
  const {id, name, photoURL, categories, price} = props.product

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
      {props.isAdmin ? (
        <div>
          <button type="button" onClick={() => props.delete(id)}>
            {' '}
            X{' '}
          </button>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}
const mapstate = state => ({
  isAdmin: state.user.isAdmin
})
const mapDeleteDispatch = dispatch => ({
  delete: id => dispatch(removeProduct(id))
})

export default connect(mapstate,mapDispatch)(ProductCard)
