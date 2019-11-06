import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    const projectId = this.props.match.params.id;
    this.props.fetchProduct(projectId)
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
        <button type="button" onClick={this.props.addToCart}>Add to cart</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    ...state.singleProduct
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
