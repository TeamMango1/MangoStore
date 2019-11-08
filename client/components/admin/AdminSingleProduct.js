import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../../store/singleProduct'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  componentDidMount() {
    const projectId = this.props.match.params.id
    this.props.fetchProduct(projectId)
  }
  render() {
    const {singleProduct} = this.props
    let categories = singleProduct.categories

    if(categories){
    return (
      <div>
        <Link to={`/adminhub/products/${singleProduct.id}/edit`}>EDIT</Link>
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
              <td>Category</td>
              <td>{categories[0].name}</td>
            </tr>
          </tbody>
        </table>
        <p>{singleProduct.description}</p>
        <button type="button" onClick={this.props.addToCart}>
          Add to cart
        </button>
      </div>)
    } else return <div></div>
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: () => dispatch({type: 'TEMP'}),
    fetchProduct: id => dispatch(fetchProduct(id))
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
