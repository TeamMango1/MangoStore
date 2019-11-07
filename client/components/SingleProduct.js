import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {postReview} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      reviewText: '',
      rating: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const projectId = this.props.match.params.id
    this.props.fetchProduct(projectId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    const projectId = this.props.match.params.id

    event.preventDefault()
    this.props.postReview(this.state, this.props.match.params.id, this.props.userId)
    this.setState({
      reviewText: '',
      rating: null
    })
    this.props.fetchProduct(projectId)
  }
  render() {

    const {singleProduct} = this.props
    let categories = singleProduct.categories
    let reviews = singleProduct.review

    if (categories && reviews) {
      return (
        <div>
          <img src={singleProduct.photoURL} />
          <h1>{singleProduct.name}</h1>
          <table>
            <tbody>
              <tr>
                <td>Price</td>
                <td>{singleProduct.price}</td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>{singleProduct.inventory}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{categories[0].name}</td>
              </tr>
            </tbody>
          </table>
          <p>{singleProduct.description}</p>
          <button type="button" onClick={this.props.addToCart}>
            Add to cart
          </button>
          <div>
            <div>Reviews </div>
            {this.props.isLoggedIn ? <div>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor='rating'>Rating</label>
                <input
                name='rating'
                type='number'
                min='1'
                max='5'
                onChange={this.handleChange}
                />
                <br/>
                <textarea
                  name="reviewText"
                  cols="50"
                  rows="5"
                  maxLength="4000"
                  wrap="hard"
                  defaultValue={this.state.reviewText}
                  onChange={this.handleChange}
                />
                <button type="submit">Add Review</button>
              </form>
            </div>: <div/>
          }
            <div>
              {reviews.map(review => {
                return (
                  <div>
                    <div>Ratings: {review.rating} Stars </div>
                    <p>Reviews: {review.reviewText}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    } else return <div />
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: () => dispatch({type: 'TEMP'}),
    fetchProduct: id => dispatch(fetchProduct(id)),
    postReview: (review,productId,userId) => dispatch(postReview(review,productId,userId))
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
