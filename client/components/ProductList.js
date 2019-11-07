import React from 'react';
import ProductCard from './ProductCard'


export default class ProductList extends React.Component{
  render(){
    return (
      <div>
      {this.props.products.length > 0 ? (
        this.props.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div> No PRODUCTS </div>
      )}
    </div>
    )
  }
}
