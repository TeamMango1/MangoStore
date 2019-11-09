import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../../store/singleProduct'
import {updateProduct} from '../../store/allProductsReducer'
import {fetchCategories} from '../../store/categoryStore'
import {assignCategory, unassignCategory} from '../../store/assignCategory'
import Select from 'react-select'
class EditSingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
    this.handleAssignCategory = this.handleAssignCategory.bind(this)
    this.handleUnassignCategory = this.handleUnassignCategory.bind(this)
  }
  componentDidMount() {
    this.props.loadcategories()
    this.props.loadSingleProduct(this.props.match.params.id)
    this.setState(this.props.product)
  }
  handleChange() {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSumbit() {
    event.preventDefault()
    this.props.edit(this.state, this.state.id)
  }
  handleAssignCategory(category) {
    this.props.setcategory(category.value, this.props.match.params.id)
    this.props.loadSingleProduct(this.props.match.params.id)
  }
  handleUnassignCategory(category){
    this.props.removecategory(category.value,this.props.match.params.id)
    this.props.loadSingleProduct(this.props.match.params.id)
  }
  render() {
    const categorylist = this.props.categories.map(category => {
      return {value: category.id, label: category.name}
    })
    let options = categorylist.filter(option => {
      if (this.props.product.categories.length === 0) return true
      else if (
        this.props.product.categories.every(
          category => category.id !== option.value
        )
      )
        return true
      return false
    })
    let deleteoptions = categorylist.filter(option => {
      if (this.props.product.categories.length === 0) return false
      else {
        for (let i = 0; i < this.props.product.categories.length; i++) {
          if (this.props.product.categories[i].id === option.value) return true
        }
      }
      return false
    })
    return (
      <div>
        <form onSubmit={this.handleSumbit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
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
            defaultValue={this.state.description}
            placeholder={this.state.description}
            onChange={this.handleChange}
          >
            {this.state.description}
          </textarea>
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
            value={this.state.availibility}
            onChange={this.handleChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
          <button type="submit">SUBMIT</button>
        </form>
        <br />
        <h3>Add Categories</h3>
        <br />
        <Select options={options} onChange={this.handleAssignCategory} />
        <br />
        <h3>Remove Categories</h3>
        <br />
        <Select options={deleteoptions} onChange={this.handleUnassignCategory} />
      </div>
    )
  }
}
const mapState = state => ({
  product: state.singleProduct,
  categories: state.allCategories
})
const mapDispatch = dispatch => ({
  loadSingleProduct: id => dispatch(fetchProduct(id)),
  edit: (product, id) => dispatch(updateProduct(product, id)),
  loadcategories: () => dispatch(fetchCategories()),
  setcategory: (categoryId, productId) =>
    dispatch(assignCategory(categoryId, productId)),
  removecategory: (categoryId, productId) =>
    dispatch(unassignCategory(categoryId, productId))
})

export default connect(mapState, mapDispatch)(EditSingleProduct)
