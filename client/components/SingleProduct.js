import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchProduct()
  }
  render() {
    return (
      <div>
        <img src={this.props.photoUrl} />
        <h1>{this.props.name}</h1>
        <table>
          <tbody>
            <tr>
              <td>Price</td>
              <td>{this.props.price}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>{this.props.inventory}</td>
            </tr>
          </tbody>
        </table>
        <p>{this.props.description}</p>
        <button onClick={this.props.addToCart}>Add to cart</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    ...state.singleProject
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: () => dispatch({type: 'TEMP'}),
    fetchProduct: id => dispatch(fetchProduct(id))
  }
}

export default connect(
  mapState,
  mapDispatch
)(SingleProduct)
