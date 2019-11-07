import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/allProductsReducer'
import ProductList from './ProductList'
import {setFilter,clearFilter} from '../store/selectedProductFilter'


export class Products extends React.Component {
  constructor(){
    super()

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
  }

  handleChange(event){
    console.log('EVENTTARGETVALUE',event.target.value)

    if(event.target.value === 'none') this.props.clearFilter()
    else this.props.setFilter(event.target.value)

    // this.props.loadProducts()
  }

  render() {
    console.log('FILTER',this.props.filter)
    // console.log('STATEFILTER',this.props.filter)
    console.log(this.props)
    const products = this.props.filter ? this.props.allProducts.filter((product)=>{
      for(let i = 0; i < product.categories.length; i++){
        if(product.categories[i].name === this.props.filter) return true
      }
      return false
    }):this.props.allProducts
    // console.log('Products', products)

      return (
        <div>
          <div>
            <Link to="/product/add">ADD PRODUCTS</Link>
          </div>
          <select onChange={this.handleChange}>
          <option>none</option>
          <option>rem</option>
          <option>quo</option>
          <option>unde</option>
          </select>
          < ProductList products={products} />
        </div>
      )
  }
}

const mapState = state => ({
  allProducts: state.allProducts,
<<<<<<< HEAD
  filter: state.selectedProductFilter
=======
  isAdmin: state.user.isAdmin
>>>>>>> master
})

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  setFilter: (filter) => dispatch(setFilter(filter)),
  clearFilter: () => dispatch(clearFilter())
})

export default connect(mapState, mapDispatch)(Products)
