import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'react-bootstrap-dialog'
import {Link} from 'react-router-dom'
import {toTitle} from "../../utils"

class OrderCard extends React.Component {
  render() {
    const order = this.props.order
    return (
      <div className="col-4 card">
        <Link to={`orders/${order.id}`}>
          <h4>Order #{order.id}</h4>
        </Link>
        <table>
          <tbody>
            <tr>
              <td>This order is {toTitle(order.status)}</td>
            </tr>
            <tr>
              <td>
                It costed $
                {order.products.reduce((prev, curr) => {
                  return prev + curr.price
                }, 0) / 100}
              </td>
            </tr>
          </tbody>
        </table>
        <Dialog
          ref={el => {
            this.dialog = el
          }}
        />
      </div>
    )
  }
}
const mapProps = (state, ownProps) => {
  return {
    order: ownProps.order
  }
}
const mapDispatch = dispatch => {
  return {}
}

export default connect(mapProps, mapDispatch)(OrderCard)
