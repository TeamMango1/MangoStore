import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const SingleProduct = props => {
  return (
    <div>
      <img src={props.photoUrl} />
      <h1>{props.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>Price</td>
            <td>{props.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>{props.inventory}</td>
          </tr>
        </tbody>
      </table>
      <p>{props.description}</p>
      <button onClick={props.addToCart}>Add to cart</button>
    </div>
  )
}

const mapState = state => {
  return {
    ...state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: () => dispatch({type: 'TEMP'})
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
