import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'react-bootstrap-dialog'

import {editOrderStatus, deleteOrder} from '../../store/orders'

class AdminOrderRow extends React.Component {
  constructor() {
    super()
    this.state = {
      toBeConfirmed: null,
      option: ''
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }
  handleSelectChange(event) {
    const value = event.target.value
    this.setState({toBeConfirmed: value})
    this.dialog.showAlert('Hello There')
  }
  handleConfirmChange(event) {
    console.log(event)
  }
  render() {
    const order = this.props.order
    console.log(order)
    return (
      <div>
        <h4>Order id {order.id}</h4>
        <table>
          <tbody>
            <tr>
              <td>Status:</td>
              <td>{order.status}</td>
              <td>User:</td>
            </tr>
          </tbody>
        </table>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
        <Dialog
          ref={el => {
            this.dialog = el
          }}
        />
        <select onChange={this.handleSelectChange}>
          <option>Cart</option>
          <option>Processing</option>
          <option>Completed</option>
          <option>Canceled</option>
        </select>
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
  return {
    editStatus: (id, status) => dispatch(editOrderStatus(id, status)),
    deleteOrder: id => dispatch(deleteOrder(id))
  }
}

export default connect(mapProps, mapDispatch)(AdminOrderRow)
