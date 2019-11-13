import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/singleOrderView'
import {Link} from 'react-router-dom'
import toTitle from '../../utils/toTitle'

export class SingleOrderView extends React.Component {
  componentDidMount() {
    this.props.loadSingleOrder(this.props.match.params.id)
  }

  render() {
    const {singleOrder} = this.props
    const products = singleOrder.products

    if (products) {
      return (
        <div>
          <div>
            <div id="singleOrderViewHeader">
              <Link to="/home">Go Back</Link>
              <div id="singleOrderDetails">
                <h2>
                  Order Number {singleOrder.id} is {toTitle(singleOrder.status)}
                </h2>
                <h4>Date Ordered: {singleOrder.createdAt} </h4>
              </div>
            </div>

            <div id="singleOrderViewProducts">
              <ul>
                {products.map(product => {
                  return (
                    <div key={product.id} id="SingleOrderProductDetails">
                      {product.availibility ? (
                        <Link to={`/products/${product.id}`}>
                          <h6>{product.name}</h6>
                        </Link>
                      ) : (
                        <Link to="/notavailible">
                          <h6>{product.name}</h6>
                        </Link>
                      )}

                      <div>${product.price}</div>
                      <img src={product.photoURL} />
                    </div>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )
    } else return <div />
  }
}

const mapState = state => ({
  singleOrder: state.singleOrderView
})

const mapDispatch = dispatch => ({
  loadSingleOrder: id => dispatch(fetchSingleOrder(id))
})

export default connect(mapState, mapDispatch)(SingleOrderView)
