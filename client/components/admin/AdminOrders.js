import React from 'react'
import {connect} from 'react-redux'

export class AdminOrders extends React.Component {
  render() {
    return <h1>List of all orders for admins</h1>
  }
}

const mapState = () => {
  return {}
}
const mapDispatch = () => {
  return {}
}

export default connect(mapState, mapDispatch)(AdminOrders)
