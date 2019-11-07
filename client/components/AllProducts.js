import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ProductsList from './ProductsList'
import {fetchProducts} from '../store/allProductsReducer'
export class Products extends React.Component {
  componentDidMount() {
    this.props.loadProducts()
  }
  render() {
    const allProducts = this.props.allProducts
      return (
        <div>
          {this.props.isAdmin ?
            <div>
              <Link to="/product/add">ADD PRODUCTS</Link>
            </div>
            :
            <div/>
          }
          <Link to="/categories">VIEW CATEGORIES</Link>
          <div>
            {allProducts.length > 0 ? (
              allProducts.map(product => (
                <ProductsList key={product.id} product={product} />
              ))
            ) : (
              <div> No PRODUCTS </div>
            )}
          </div>
        </div>
      )
  }
}

const mapState = state => ({
  allProducts: state.allProducts,
  isAdmin: state.user.isAdmin
})

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(Products)
