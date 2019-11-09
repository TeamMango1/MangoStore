import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSingleUserOrders} from '../store/orders'
import {Link} from 'react-router-dom'
import PasswordReset from './PasswordReset'

export class UserHome extends React.Component {
  componentDidMount() {
    this.props.loadSingleUserOrders()
    console.log(this.props)
  }

  render() {
    const {passwordReset} = this.props
    let orders = this.props.orders
    console.log(orders)

    if (orders) {
      return (
        <div>
          {passwordReset ? (
            <PasswordReset />
          ) : (
            <div>
              <h2>Welcome</h2>
              <h4>Your Orders</h4>
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
    } else return <div />
  }
}

const mapState = state => ({
  orders: state.orders.orders,
  userInfo: state.user,
  passwordReset: state.user.passwordReset
})

const mapDispatch = dispatch => ({
  loadSingleUserOrders: id => dispatch(fetchSingleUserOrders(id))
})

export default connect(mapState, mapDispatch)(UserHome)
