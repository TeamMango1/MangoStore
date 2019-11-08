import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../../store/allProductsReducer'
import {fetchCategories} from '../../store/categoryStore'

import AdminProductList from './AdminProductList'
import {setFilter, clearFilter} from '../../store/selectedProductFilter'

export class AdminProducts extends React.Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
    this.props.getCategories()
  }

  handleChange(event) {
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
        <div>
          <Link to="/product/add">ADD PRODUCTS</Link>
          <br />
          <Link to="/categories">CATEGORIES</Link>
        </div>
        <select className="col-4 custom-select" onChange={this.handleChange}>
          <option>none</option>
          {this.props.categories.map(category => {
            return <option key={category.id}>{category.name}</option>
          })}

        </select>
        <AdminProductList products={products} />
      </div>
    )
  }
}

const mapState = state => ({
  allProducts: state.allProducts,
  filter: state.selectedProductFilter,
  isAdmin: state.user.isAdmin,
  categories: state.allCategories
})

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  setFilter: filter => dispatch(setFilter(filter)),
  clearFilter: () => dispatch(clearFilter()),
  getCategories: () => dispatch(fetchCategories())
})

export default connect(mapState, mapDispatch)(AdminProducts)
