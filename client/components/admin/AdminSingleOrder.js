import React from 'react'
import {connect} from 'react-redux'
import {editOrderStatus, fetchOrder} from '../../store/singleOrder'
import AdminProductList from "./AdminProductList"

export class AdminSingleOrder extends React.Component {
  componentDidMount() {
    // this.props.loadOrder(this.props.match.params.id)
  }
  render() {

    return (
      <div>
        {/* <AdminProductList products = {this.props.order.products}/> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order:state.orders.selected
})

const mapDispatchToProps = dispatch => ({
  loadOrder: id => dispatch(fetchOrder(id)),
  editStatus: status => dispatch(editOrderStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleOrder)
