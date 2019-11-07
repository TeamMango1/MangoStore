import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categoryStore'
class Categories extends React.Component {
  componentDidMount(){
    this.props.loadCategories()
  }
  render() {
    const categories = this.props.categories
    console.log(categories)
    return (
      <div>
        <ol>
          {categories.map(category =>
          <li key={category.id}>{category.name}</li>)}
        </ol>
      </div>
    )
  }
}

const mapCategories = state => (
  {
    categories: state.allCategories
  }
)
const mapDispatch = dispatch => (
  {
    loadCategories: () => dispatch(fetchCategories())
  }
)

export default connect(mapCategories,mapDispatch)(Categories)
