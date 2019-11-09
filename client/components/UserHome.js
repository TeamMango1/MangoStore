import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSingleUserOrders} from '../store/orders'
import {Link} from 'react-router-dom'
import {setFilter, clearFilter} from '../store/selectedProductFilter'
import PasswordReset from './PasswordReset'

export class UserHome extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadSingleUserOrders()
    console.log('PROPSSS', this.props)
  }

  handleChange(event) {
    if (event.target.value === 'None') this.props.clearFilter()
    else this.props.setFilter(event.target.value)
  }

  render() {
    console.log('RENDERPROPS:', this.props)

    const {passwordReset} = this.props
    let orders = this.props.filter
      ? this.props.orders.filter(order => {
          return order.status.toUpperCase() === this.props.filter.toUpperCase()
        })
      : this.props.orders
    return (
      <div>
        {passwordReset ? (
          <PasswordReset />
        ) : (
          <div>
            <h2>Welcome</h2>
            <h4>Your Orders</h4>
            <select onChange={this.handleChange}>
              <option>None</option>
              <option>Completed</option>
              <option>Processing</option>
              <option>Canceled</option>
              <option>Cart</option>
            </select>
            <ul>
              {orders.map(order => {
                return (
                  <div key={order.id}>
                    <div key={order.id}>
                      <Link to={`/orders/${order.id}`}>
                        Order Number #{order.id}
                      </Link>
                    </div>
                    <div>Status: {order.status}</div>
                  </div>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  orders: state.orders.orders,
  userInfo: state.user,
  filter: state.selectedProductFilter,
  passwordReset: state.user.passwordReset
})

const mapDispatch = dispatch => ({
  loadSingleUserOrders: id => dispatch(fetchSingleUserOrders(id)),
  setFilter: filter => dispatch(setFilter(filter)),
  clearFilter: () => dispatch(clearFilter())
})

export default connect(mapState, mapDispatch)(UserHome)
