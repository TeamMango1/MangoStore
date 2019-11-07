import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/allProductsReducer'
import ProductList from './ProductList'
import {setFilter} from '../store/selectedProductFilter'


export class Products extends React.Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
  }
  handleChange(event){
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  render() {
    console.log('THISPROPS',this.props)
    const products = this.props.filter ? this.props.allProducts.filter(()=>{

    }):this.props.allProducts

      return (
        <div>

          <div>
            <Link to="/product/add">ADD PRODUCTS</Link>
          </div>
          <select onChange={this.handleChange}>
          <option>rem</option>
          <option>none</option>
          <option>quo</option>
          <option>unde</option>
          </select>
          < ProductList  products={products} />
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
  setFilter: (filter) => dispatch(setFilter(filter))
})

export default connect(mapState, mapDispatch)(Products)
