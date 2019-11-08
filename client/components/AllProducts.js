import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/allProductsReducer'
import ProductList from './ProductList'
import {setFilter, clearFilter} from '../store/selectedProductFilter'
import {fetchCategories} from '../store/categoryStore'

export class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.searchHandleChange = this.searchHandleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
    this.props.getCategories()
  }

  handleChange(event) {
    if (event.target.value === 'none') this.props.clearFilter()
    else this.props.setFilter(event.target.value)
  }
  searchHandleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  render() {
    let products = ''
    if (this.state.search !== '') {
      products = this.props.allProducts.filter(product =>
        product.name.includes(this.state.search)
      )
    } else {
      products = this.props.filter
        ? this.props.allProducts.filter(product => {
            for (let i = 0; i < product.categories.length; i++) {
              if (product.categories[i].name === this.props.filter) return true
            }
            return false
          })
        : this.props.allProducts
    }

    return (
      <div className="container">
        <select className="col-4 custom-select" onChange={this.handleChange}>
          <option>none</option>
          {this.props.categories.map(category => {
            return <option key={category.id}>{category.name}</option>
          })}
        </select>
        <br />
        <input
          name="search"
          onChange={this.searchHandleChange}
          defaultValue={this.state.search}
          placeholder="search"
        />
        <div>
          <ProductList products={products} />
        </div>
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

export default connect(mapState, mapDispatch)(Products)
