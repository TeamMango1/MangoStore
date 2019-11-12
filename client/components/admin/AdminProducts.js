import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../../store/allProductsReducer'
import {fetchCategories} from '../../store/categoryStore'
import queryString from 'query-string'

import AdminProductList from './AdminProductList'
import {setFilter, clearFilter} from '../../store/selectedProductFilter'

export class AdminProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      search: '',
      page:1
    }
    this.handleChange = this.handleChange.bind(this)
    this.searchHandleChange = this.searchHandleChange.bind(this)

    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
  }
  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    this.setState({page: Number(values.page)})
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

  async handleNextClick() {
    await this.props.loadProducts(this.state.page + 1)
    this.props.history.push(`/adminhub/products?page=${this.state.page + 1}`)
    this.setState({
      page: this.state.page + 1
    })
  }
  async handlePrevClick() {
    await this.props.loadProducts(this.state.page - 1)
    this.props.history.push(`/adminhub/products?page=${this.state.page - 1}`)
    this.setState({
      page: this.state.page - 1
    })
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
        <br/>
        <input
          name="search"
          onChange={this.searchHandleChange}
          defaultValue={this.state.search}
          placeholder="search"
        />
        <div>
          <div>
            <AdminProductList products={products} />
          </div>
          {values.page > 1 ? (
              <button
                className="btn btn-outline-dark mx-5 col-2"
                type="button"
                onClick={this.handlePrevClick}
              >
                Previous Page
              </button>
            ) : (
              <div />
            )}
            <button
              className="btn btn-outline-dark mx-5 col-2"
              type="button"
              onClick={this.handleNextClick}
            >
              Next Page
            </button>
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
  loadProducts: pageNum => dispatch(fetchProducts(pageNum)),
  setFilter: filter => dispatch(setFilter(filter)),
  clearFilter: () => dispatch(clearFilter()),
  getCategories: () => dispatch(fetchCategories())
})

export default connect(mapState, mapDispatch)(AdminProducts)
