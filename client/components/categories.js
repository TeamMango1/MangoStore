import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories, postCategory} from '../store/categoryStore'
class Categories extends React.Component {
  constructor() {
    super()
    this.state = {name: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
  }
  componentDidMount() {
    this.props.loadCategories()
  }
  handleChange() {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSumbit() {
    event.preventDefault()
    this.props.addNewCategory(this.state)
    this.props.loadCategories()
    this.setState({name: ''})
  }
  render() {
    const categories = this.props.categories
    let isdisabled;
    if(this.state.name === '') isdisabled = false
    else{
      isdisabled = categories.every(category => category!==this.state.name)
    }

    if (!categories) {
      return <div />
    } else {
      return (
        <div>
          <ol>
            {categories.map(category => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ol>
          <div>
            <form onSubmit={this.handleSumbit}>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <button type="submit" disabled={isdisabled}>ADD CATEGORY</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

const mapCategories = state => ({
  categories: state.allCategories
})
const mapDispatch = dispatch => ({
  loadCategories: () => dispatch(fetchCategories()),
  addNewCategory: category => dispatch(postCategory(category))
})

export default connect(mapCategories, mapDispatch)(Categories)
