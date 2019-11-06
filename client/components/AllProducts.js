import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ProductsList from './ProductsList'
import {fetchProducts} from '../store/allProductsReducer'
import AddProduct from './AddProduct'
export class Products extends React.Component {
  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const allProducts = this.props.allProducts
    console.log(allProducts.length)
    if(allProducts.length!==0){
      return (
        <div>
          <div>
            <Link to="/product/add">ADD PRODUCTS</Link>
            <AddProduct />
          </div>
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
      )} else{
        return (<div/>)
      }
  }
}

const mapState = state => ({
  allProducts: state.allProducts
})

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(Products)
