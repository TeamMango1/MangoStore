import React from 'react'
import {connect} from 'react-redux'
import ProductsList from './ProductsList'

export const Products = props => {
  const allProducts = props.allProducts
  return (
    <div>
      <div>
        <Link to="/products/add">ADD PRODUCTS</Link>
      </div>
      <div>
        {allProducts.length > 0 ? (
          allProducts.map(product => (
            <ProductList key={product.id} product={product} />
          ))
        ) : (
          <div> No PRODUCTS </div>
        )}
      </div>
    </div>
  )
}

const mapAllProducts = state => ({
  allProducts: state.allProducts
})

export default connect(mapAllProducts)(Products)
