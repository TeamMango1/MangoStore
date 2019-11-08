import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'react-bootstrap-dialog'
import {
  editOrderStatus,
  fetchOrder,
  removeProductFromOrder
} from '../../store/singleOrder'
import AdminProductList from './AdminProductList'

const toTitle = upper =>
  upper[0].toUpperCase() + upper.substring(1).toLowerCase()

export class AdminSingleOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      toBeConfirmed: null,
      option: 'CART'
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCancelChange = this.handleCancelChange.bind(this)
  }
  handleSelectChange(event) {
    const value = event.target.value
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
  async componentDidMount() {
    await this.props.loadOrder(this.props.match.params.id)
    this.setState({option: this.props.order.status})
  }
  render() {
    const {order} = this.props
    const {user, products} = order
    return (
      <div>
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
              <td>{user.email}</td>
            </tr>
          </tbody>
        </table>
        <Dialog
          ref={el => {
            this.dialog = el
          }}
        />
        <div>Products:</div>
        <AdminProductList
          products={products}
          buttonName="Remove Product From Order"
          click={product => {
            return () => this.props.removePFO(product.id, order.id)
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.singleOrder
})

const mapDispatchToProps = dispatch => ({
  loadOrder: async id => await dispatch(fetchOrder(id)),
  editStatus: (id, status) => dispatch(editOrderStatus(id, status)),
  removePFO: (pId, oId) => dispatch(removeProductFromOrder(pId, oId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleOrder)
