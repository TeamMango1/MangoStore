import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/singleOrderView'
import {Link} from 'react-router-dom'

export class SingleOrderView extends React.Component {
  componentDidMount() {
    this.props.loadSingleOrder(this.props.match.params.id)
  }

  render() {
    console.log('PROPS',this.props)

    const products = this.props.singleOrder.products
    if (products) {
      return (
        <div>
          <div>
            <Link to="/home">Go Back</Link>
          </div>
          <div>Single Order View</div>
          <ul>
            {products.map(product => {
              return (
                <div>
                  <div>{product.name}</div>
                  <div>${product.price}</div>
                  <img src={product.photoURL} />
                </div>
              )
            })}
          </ul>
        </div>
      )
    } else return <div/>
  }
}

const mapState = state => ({
  singleOrder: state.singleOrderView
})

const mapDispatch = dispatch => ({
  loadSingleOrder: id => dispatch(fetchSingleOrder(id))
})

export default connect(mapState, mapDispatch)(SingleOrderView)
