import React from 'react';
import AdminProductCard from './AdminProductCard'


export default class AdminProductList extends React.Component{
  render(){
    return (
      <div>
      {this.props.products.length > 0 ? (
        this.props.products.map(product => (
          <AdminProductCard key={product.id} product={product} />
        ))
      ) : (
        <div> No PRODUCTS </div>
      )}
    </div>
    )
  }
}
