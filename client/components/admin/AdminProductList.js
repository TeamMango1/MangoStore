import React from 'react'
import AdminProductCard from './AdminProductCard'

export default class AdminProductList extends React.Component {
  render() {
    let passDown = {}
    if (this.props.buttonName)
      passDown = {
        buttonName: this.props.buttonName,
        click: this.props.click
      }
    return (
      <div className="container">
        <div className="row">
          {this.props.products.length > 0 ? (
            this.props.products.map(product => (
              <AdminProductCard
                key={product.id}
                product={product}
                {...passDown}
              />
            ))
          ) : (
            <div> No PRODUCTS </div>
          )}
        </div>
      </div>
    )
  }
}
