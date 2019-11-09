import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeProduct} from '../../store/allProductsReducer'

const AdminProductCard = props => {
  const {id, name, photoURL, price, availibility} = props.product

  let click,
    special = false
  if (props.diffClick) {
    click = props.diffClick(props.product)
    special = true
  }
  if (availibility) {
    return (
      <div className="col-4 card">
        <Link to={`/adminhub/products/${id}`}> {name}</Link>
        <div>
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
              onClick={() => {
                special ? click() : props.delete(id)
              }}
            >
              {` ${props.buttonName} `}
            </button>
          </div>
        </div>
      </div>
    )
  } else return <div />
}
const mapState = (state, own) => ({
  buttonName: own.buttonName ? own.buttonName : 'Remove Product',
  diffClick: own.click ? own.click : false
})

const mapDeleteDispatch = dispatch => ({
  delete: id => dispatch(removeProduct(id))
})

export default connect(mapState, mapDeleteDispatch)(AdminProductCard)
