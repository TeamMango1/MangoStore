import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'react-bootstrap-dialog'

import {editOrderStatus, deleteOrder} from '../../store/orders'
import DialogAction from 'react-bootstrap-dialog/dist/DialogAction'

const toTitle = upper =>
  upper[0].toUpperCase() + upper.substring(1).toLowerCase()

class AdminOrderRow extends React.Component {
  constructor() {
    super()
    console.log(this.props)
    this.state = {
      toBeConfirmed: null,
      option: 'CART'
    }

    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCancelChange = this.handleCancelChange.bind(this)
  }
  componentDidMount() {
    this.setState({option: this.props.order.status})
  }
  handleSelectChange(event) {
    const value = event.target.value
    console.log(value)
    this.setState({toBeConfirmed: value})
    this.dialog.show({
      body: `Change the status of this order to ${toTitle(
        event.target.value
      )}?`,
      actions: [
        Dialog.CancelAction(() => {
          this.handleCancelChange()
        }),
        Dialog.OKAction(() => {
          this.handleConfirmChange()
        })
      ]
    })
  }
  handleCancelChange() {
    this.setState({toBeConfirmed: null})
  }
  handleConfirmChange() {
    this.props.editStatus(this.props.order.id, this.state.toBeConfirmed)
    this.setState(state => ({
      option: state.toBeConfirmed,
      toBeConfirmed: null
    }))
  }
  render() {
    const order = this.props.order
    console.log(order)
    return (
      <div className="col-4 card">
        <h4>Order {order.id}</h4>
        <table>
          <tbody>
            <tr>
              <td>Status:</td>
              <td>
                <select
                  value={this.state.option}
                  onChange={this.handleSelectChange}
                >
                  <option value="CART">Cart</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELED">Canceled</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>User:</td>
              <td>{order.user.email}</td>
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
  return {
    editStatus: (id, status) => dispatch(editOrderStatus(id, status)),
    deleteOrder: id => dispatch(deleteOrder(id))
  }
}

export default connect(mapProps, mapDispatch)(AdminOrderRow)
