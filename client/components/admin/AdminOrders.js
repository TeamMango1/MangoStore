import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, changeFilter} from '../../store/orders'
import AdminOrderRow from './AdminOrderCard'

export class AdminOrders extends React.Component {
  componentDidMount() {
    this.props.loadOrders()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    const value = event.target.value
    this.props.changeFilter(value === 'none' ? null : value)
  }
  render() {
    const orders = this.props.filter && this.props.orders
      ? this.props.orders.filter(
          thing => thing.status === this.props.filter
        )
      : this.props.orders
    return (
      <div className="container">
        <select onChange={this.handleChange}>
          <option value="none">no filter</option>
          <option value="CART">Cart</option>
          <option value="PAID">Paid</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELED">Canceled</option>
        </select>
        <div className="row">
          {orders.map(order => {
            return <AdminOrderRow key={order.id} order={order} />
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders.orders,
    filter: state.orders.filter
  }
}

const mapDispatch = dispatch => {
  return {
    loadOrders: () => dispatch(fetchOrders()),
    changeFilter: f => dispatch(changeFilter(f))
  }
}

export default connect(mapState, mapDispatch)(AdminOrders)
