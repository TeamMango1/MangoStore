import React from 'react'
import {connect} from 'react-redux'
import {editOrderStatus, deleteOrder} from '../../store/orders'

const AdminOrderRow = props => {
  const order = props.order
  console.log(order)
  return (
    <div>
      <h4>Order id {order.id}</h4>
      <table>
        <tbody>
          <tr>
            <td>Status:</td><td>{order.status}</td>
            <td>User:</td>
          </tr>
        </tbody>
      </table>
      <button type="button" className="btn btn-danger">
        Delete
      </button>
    </div>
  )
}
const mapProps = (state, ownProps) => {
  return {
    order: ownProps.order
  }
}
const mapDispatch = dispatch => {
  return {
    editStatus: (id, status) => dispatch(editOrderStatus(id, status)),
    deleteOrder: id => dispatch(deleteOrder(id))
  }
}

export default connect(mapProps, mapDispatch)(AdminOrderRow)
