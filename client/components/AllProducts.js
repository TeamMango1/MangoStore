import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/allProductsReducer'
import ProductList from './ProductList'
import {setFilter, clearFilter} from '../store/selectedProductFilter'
import {Link} from 'react-router-dom'

export class Products extends React.Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
  }

  handleChange(event) {
    console.log('EVENTTARGETVALUE', event.target.value)

    if (event.target.value === 'none') this.props.clearFilter()
    else this.props.setFilter(event.target.value)
  }

  render() {
    const products = this.props.filter
      ? this.props.allProducts.filter(product => {
          for (let i = 0; i < product.categories.length; i++) {
            if (product.categories[i].name === this.props.filter) return true
          }
          return false
        })
      : this.props.allProducts
    return (
      <div>
        <div className="navbar-nav nav-fill">
          <div className="nav-item">
            <Link className="nav-link" to="/product/add">
              ADD PRODUCTS
            </Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/categories">
              CATEGORIES
            </Link>
            <select className="nav-item" onChange={this.handleChange}>
              <option>none</option>
              <option>rem</option>
              <option>quo</option>
              <option>unde</option>
            </select>
          </div>
        </div>
        <ProductList products={products} />
      </div>
    )
  }
}

const mapState = state => ({
  allProducts: state.allProducts,
  filter: state.selectedProductFilter
})

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  setFilter: filter => dispatch(setFilter(filter)),
  clearFilter: () => dispatch(clearFilter())
})

export default connect(mapState, mapDispatch)(Products)
