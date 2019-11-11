import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProductsReducer'
import queryString from 'query-string'
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
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
  }
  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    this.props.loadProducts(values.page)
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
  handleNextClick() {
    const values = queryString.parse(this.props.location.search)
    this.props.loadProducts(Number(values.page) + 1)
    this.props.history.push(`/products?page=${Number(values.page) + 1}`)
  }
  handlePrevClick() {
    const values = queryString.parse(this.props.location.search)
    this.props.loadProducts(Number(values.page) - 1)
    this.props.history.push(`/products?page=${Number(values.page) - 1}`)
  }

  render() {
    const values = queryString.parse(this.props.location.search)
    let products = ''
    if (this.state.search !== '') {
      products = this.props.allProducts.filter(product =>
        product.name.toLowerCase().includes(this.state.search.toLowerCase())
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
        {values.page > 1 ? (
          <button type="button" onClick={this.handlePrevClick}>
            Previous Page
          </button>
        ) : (
          <div />
        )}
        <button type="button" onClick={this.handleNextClick}>
          Next Page
        </button>
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
  loadProducts: pageNumber => dispatch(fetchProducts(pageNumber)),
  setFilter: filter => dispatch(setFilter(filter)),
  clearFilter: () => dispatch(clearFilter()),
  getCategories: () => dispatch(fetchCategories())
})

export default connect(mapState, mapDispatch)(Products)
