import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {addToCart} from '../store/cartReducer'

class SingleProduct extends React.Component {
  componentDidMount() {
    const projectId = this.props.match.params.id
    this.props.fetchProduct(projectId)
  }
  render() {
    const {singleProduct} = this.props
    let categories = singleProduct.categories

    if (categories) {
      return (
        <div>
          <img src={singleProduct.photoURL} />
          <h1>{singleProduct.name}</h1>
          <table>
            <tbody>
              <tr>
                <td>Price</td>
                <td>{singleProduct.price}</td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>{singleProduct.inventory}</td>
              </tr>
              <tr>
                {categories.length > 0 ? (
                  <td>Category: {categories[0].name}</td>
                ) : (
                  <td />
                )}
              </tr>
            </tbody>
          </table>
          <p>{singleProduct.description}</p>
          <button type="button" onClick={this.props.addToCart}>
            Add to cart
          </button>
        </div>
      )
    } else return <div />
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: id => dispatch(addToCart(id)),
    fetchProduct: id => dispatch(fetchProduct(id))
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
