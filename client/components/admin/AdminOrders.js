import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, changeFilter} from '../../store/orders'
import queryString from 'query-string'
import AdminOrderRow from './AdminOrderCard'

export class AdminOrders extends React.Component {

  constructor(){
    super()
    this.state = {
      page:1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
  }


  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    this.setState({ page:Number(values.page) })
    this.props.loadOrders(values.page)
    console.log('STATE::::', this.state)
  }

  handleChange(event) {
    const value = event.target.value
    this.props.changeFilter(value === 'none' ? null : value)
  }

  handleNextClick(){
    this.setState({page: this.state.page += 1})
    console.log('STATE::::', this.state)
    this.props.loadOrders(this.state.page)
    this.props.history.push(`/adminhub/orders?page=${this.state.page + 1}`)
  }

  render() {
    console.log('ADMINPROPS:', this.props)

    const orders = this.props.filter && this.props.orders
      ? this.props.orders.filter(
          thing => thing.status === this.props.filter
        )
      : this.props.orders

    return (
      <div className="container">
        <select onChange={this.handleChange}>
          <option value="none">no filter</option>
          <option value="CART">Cart</option>
          <option value="PAID">Paid</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELED">Canceled</option>
        </select>
        <div className="row">
          {orders.map(order => {
            return <AdminOrderRow key={order.id} order={order} />
          })}
        </div>
        <button type="button" onClick={this.handleNextClick}>
          Next Page
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders.orders,
    filter: state.orders.filter
  }
}

const mapDispatch = dispatch => {
  return {
    loadOrders: (pageNum) => dispatch(fetchOrders(pageNum)),
    changeFilter: f => dispatch(changeFilter(f))
  }
}

export default connect(mapState, mapDispatch)(AdminOrders)
