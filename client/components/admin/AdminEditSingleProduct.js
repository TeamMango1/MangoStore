import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../../store/singleProduct'
import {updateProduct} from '../../store/allProductsReducer'
import {fetchCategories} from '../../store/categoryStore'
import {assignCategory} from '../../store/assignCategory'
import {setCategoriesFilter} from '../../store/selectedCategoriesFilter'
import Select from 'react-select'
class EditSingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
    this.handleAssignCategory = this.handleAssignCategory.bind(this)
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
  }
  render() {
    let options = this.props.categories
      .map(category => {
        return {value: category.id, label: category.name}
      })
      .filter(option => {
        if (this.props.categorylist.length === 0) {
          return true
        } else if (
          this.props.categorylist.every(category => category !== option.value)
        ) {
          return true
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
        <Select options={options} onChange={this.handleAssignCategory} />
      </div>
    )
  }
}
const mapState = state => ({
  product: state.singleProduct,
  categories: state.allCategories,
})
const mapDispatch = dispatch => ({
  loadSingleProduct: id => dispatch(fetchProduct(id)),
  edit: (product, id) => dispatch(updateProduct(product, id)),
  loadcategories: () => dispatch(fetchCategories()),
  setcategory: (categoryId, productId) =>
    dispatch(assignCategory(categoryId, productId)),
})

export default connect(mapState, mapDispatch)(EditSingleProduct)
