import React from 'react'
import {postProduct} from '../store/allProductsReducer'
import {connect} from 'react-redux'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      photoURL: '',
      price: 0.0,
      inventory: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
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
      inventory: 1
    })
  }
  render() {
    return (
      <div>
        <div>
          <h1>Product</h1>
        </div>
        <div>
          <form onSubmit={this.handleSumbit}>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
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
              defaultValue={this.state.description}
              onChange={this.handleChange}
              required
            >
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
            <button type="submit">ADD THIS PRODUCT NOW!!!</button>
          </form>
        </div>
      </div>
    )
  }
}
const mapAddProductDispatch = dispatch => (
  {
    addnewProduct: (product) => dispatch(postProduct(product))
  }
)
export default connect(null, mapAddProductDispatch)(AddProduct)
