import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/orders'
import AdminOrderRow from './AdminOrderCard'

export class AdminOrders extends React.Component {
  componentDidMount() {
    this.props.loadOrders()
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.orders.map(order => {
            return <AdminOrderRow key={order.id} order={order} />
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {orders: state.orders}
}

const mapDispatch = dispatch => {
  return {loadOrders: () => dispatch(fetchOrders())}
}

export default connect(mapState, mapDispatch)(AdminOrders)
