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
  }

  handleChange(event) {
    if (event.target.value === 'None') this.props.clearFilter()
    else this.props.setFilter(event.target.value)
  }

  render() {
    const {passwordReset, userInfo} = this.props

    let orders = this.props.filter
      ? this.props.orders.filter(order => {
          return order.status === this.props.filter
        })
      : this.props.orders

      console.log(orders)

    return (
      <div>
        {passwordReset ? (
          <PasswordReset />
        ) : (
          <div className="container">
            <h2>Welcome Back, {userInfo.firstName}!</h2>
            <h4>Your Previous Orders</h4>
            <div className="filter">
              <select onChange={this.handleChange}>
                <option value="None">All Orders</option>
                <option value="PROCESSING">Processing</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELED">Canceled</option>
              </select>
            </div>

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
