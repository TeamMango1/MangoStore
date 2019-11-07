import React from 'react'
import ProductCard from './AdminProductCard'

export default class ProductList extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.products.length > 0 ? (
            this.props.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div> No PRODUCTS </div>
          )}
        </div>
      </div>
    )
  }
}
