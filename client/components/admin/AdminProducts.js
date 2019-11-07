import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../../store/allProductsReducer'
import AdminProductList from './AdminProductList'
import {setFilter, clearFilter} from '../../store/selectedProductFilter'

export class AdminProducts extends React.Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
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
        <select onChange={this.handleChange}>
          <option>none</option>
          <option>rem</option>
          <option>quo</option>
          <option>unde</option>
        </select>
        <AdminProductList products={products} />
      </div>
    )
  }
}

const mapState = state => ({
  allProducts: state.allProducts,
  filter: state.selectedProductFilter,
  isAdmin: state.user.isAdmin
})

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  setFilter: filter => dispatch(setFilter(filter)),
  clearFilter: () => dispatch(clearFilter())
})

export default connect(mapState, mapDispatch)(AdminProducts)
