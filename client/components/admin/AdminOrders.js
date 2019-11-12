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
    this.handlePrevClick = this.handlePrevClick.bind(this)
  }


  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    this.setState({ page: Number(values.page)})
    this.props.loadOrders(values.page)
  }

  handleChange(event) {
    const value = event.target.value
    this.props.changeFilter(value === 'none' ? null : value)
  }

  async handleNextClick(){
    await this.props.loadOrders(this.state.page + 1)
    this.props.history.push(`/adminhub/orders?page=${this.state.page + 1}`)
    this.setState({ page: this.state.page + 1})

  }

  async handlePrevClick(){
    await this.props.loadOrders(this.state.page - 1)
    this.props.history.push(`/adminhub/orders?page=${this.state.page - 1}`)
    this.setState({ page: this.state.page - 1})
  }


  render() {
    console.log('ADMINPROPS:', this.props)

    const num = queryString.parse(this.props.location.search)

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
        {num.page > 1 ? (
          <button type="button" onClick={this.handlePrevClick}>
            Previous Page
          </button>
        ) : (
          <div />
        )}
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
    loadOrders: pageNum => dispatch(fetchOrders(pageNum)),
    changeFilter: f => dispatch(changeFilter(f))
  }
}

export default connect(mapState, mapDispatch)(AdminOrders)
