import React from 'react'
import {postProduct, fetchProducts} from '../store/allProductsReducer'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categoryStore'
import {assignCategory} from '../store/assignCategory'
import {setCategoriesFilter} from '../store/selectedCategoriesFilter'
import Select from 'react-select'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      photoURL: '',
      price: 0.0,
      inventory: 1,
      availibility: true
    }
    this.select=true
    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
    this.handleAssignCategory = this.handleAssignCategory.bind(this)
  }
  componentDidMount() {
    this.props.loadCategories()
    this.props.loadProducts()
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSumbit(event) {
    event.preventDefault()
    this.props.addnewProduct(this.state)
    this.setState({
      name: '',
      description: '',
      photoURL: '',
      price: 0.0,
      inventory: 1,
      availibility: true
    })
    this.select=false
  }
  handleAssignCategory(category) {
    this.props.setcategory(category.value, this.props.products.id)
    this.props.setcategoriesfilter(category.value)
  }
  render() {
    let options = this.props.categories
      .map(category => {
        return {value: category.id, label: category.name}
      })
      .filter(option => {
        if(this.props.categorylist.length===0){
          return true
        }else if (this.props.categorylist.every(category=>category!==option.value)) return true
        return false
      })
    let isEnabled;
    if(this.state.name === '' || this.state.description === '') isEnabled=true
    else isEnabled=false
    return (
      <div>
        <div>
          <h1>Product</h1>
        </div>
        <div>
          <div>
            <form onSubmit={this.handleSumbit}>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder='required'
                required
              />
              <br />
              <label htmlFor="description">description</label>
              <br />
              <textarea
                name="description"
                cols="50"
                rows="5"
                maxLength="500"
                wrap="hard"
                placeholder='required'
                defaultValue={this.state.description}
                onChange={this.handleChange}
                required
              />
              <br />
              <label htmlFor="photoURL">photoURL</label>
              <br />
              <input
                type="text"
                name="photoURL"
                value={this.state.photoURL}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="price">price</label>
              <br />
              <input
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="inventory">inventory</label>
              <br />
              <input
                type="number"
                name="inventory"
                value={this.state.inventory}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="availibility">availibility</label>
              <br />
              <select
                name="availibility"
                defaultValue={true}
                onChange={this.handleChange}
              >
                <option value={true}>TRUE</option>
                <option value={false}>FALSE</option>
              </select>
              <button type="submit" disabled={isEnabled}>ADD THIS PRODUCT NOW!!!</button>
            </form>
            <br />
            <Select options={options} onChange={this.handleAssignCategory} isDisabled={this.select}/>
          </div>
        </div>
      </div>
    )
  }
}
const mapCategory = state => ({
  products: state.allProducts,
  categories: state.allCategories,
  categorylist: state.selectedCategoriesFilter
})
const mapAddProductDispatch = dispatch => ({
  addnewProduct: product => dispatch(postProduct(product)),
  loadCategories: () => dispatch(fetchCategories()),
  loadProducts: () => dispatch(fetchProducts()),
  setcategory: (categoryId, productId) =>
    dispatch(assignCategory(categoryId, productId)),
  setcategoriesfilter: filter => dispatch(setCategoriesFilter(filter))
})
export default connect(mapCategory, mapAddProductDispatch)(AddProduct)
