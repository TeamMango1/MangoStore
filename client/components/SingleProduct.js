import React from 'react'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import {fetchProduct, postReview} from '../store/singleProduct'
import {addToCart} from '../store/cartReducer'

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
    event.preventDefault()
    const projectId = this.props.match.params.id

    this.props.postReview(
      this.state,
      this.props.match.params.id,
      this.props.userId
    )
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
        <div className="container">
          <div className="row">
            <img className="col-sm" src={singleProduct.photoURL} />
            <div className="col-sm">
              <h1>{singleProduct.name}</h1>
              <table>
                <tbody>
                  <tr>
                    <td>{singleProduct.description}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>${singleProduct.price}</td>
                  </tr>
                  <tr>
                    {singleProduct.inventory === 0 ? (
                      <td>Out Of Stock</td>
                    ) : (
                      <td />
                    )}
                  </tr>
                  <tr>
                    {categories.length > 0 ? (
                      <td>Category: {categories[0].name}</td>
                    ) : (
                      <td />
                    )}
                  </tr>
                </tbody>
              </table>
              <p>{singleProduct.description}</p>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  this.props.addToCart(singleProduct.id)
                  toast.success('The item was added to your cart!')
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="container mt-3">
            <div className="row justify-content-md-center">
              <h3 className="">Reviews</h3>
            </div>
            <div className="row justify-content-md-center">
              {this.props.isLoggedIn ? (
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <label className="mx-1" htmlFor="rating">
                      Rating
                    </label>
                    <input
                      name="rating"
                      type="number"
                      min="1"
                      max="5"
                      onChange={this.handleChange}
                      className=""
                    />
                    <br />
                    <div className="row align-items-center">
                      <textarea
                        name="reviewText"
                        cols="50"
                        rows="5"
                        maxLength="4000"
                        wrap="hard"
                        defaultValue={this.state.reviewText}
                        onChange={this.handleChange}
                      />
                      <button
                        className="btn btn-outline-primary mx-2"
                        type="submit"
                      >
                        Add Review
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div />
              )}
              <div className="mt-2">
                {reviews.map(review => {
                  return (
                    <div key={review.id}>
                      <div>Ratings: {review.rating} Stars </div>
                      <p>Reviews: {review.reviewText}</p>
                    </div>
                  )
                })}
              </div>
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
    addToCart: id => dispatch(addToCart(id)),
    fetchProduct: id => dispatch(fetchProduct(id)),
    postReview: (review, productId, userId) =>
      dispatch(postReview(review, productId, userId))
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
