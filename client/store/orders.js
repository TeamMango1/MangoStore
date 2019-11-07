import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const EDITED_ORDER_STATUS = 'EDITED_ORDER_STATUS'
const DELETED_ORDER = 'DELETED_ORDER'

const initialState = []

const gotOrders = orders => ({type: GET_ORDERS, orders})
const editedStatus = order => ({type: EDITED_ORDER_STATUS, order})
const deletedOrder = id => ({type: DELETED_ORDER, id})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(gotOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const editOrderStatus = (orderId, status) => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders', {orderId, status})
    dispatch(editedStatus(data))
  } catch (err) {
    console.log(err)
  }
}

export const deleteOrder = orderId => async dispatch => {
  try {
    await axios.delete('/api/order', {data: {orderId}})
    dispatch(deletedOrder(orderId))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case EDITED_ORDER_STATUS:
      return state.map(order => {
        if (order.id === action.order.id) {
          return action.order
        }
        return order
      })
    case DELETED_ORDER:
      return state.filter(order => order.id !== action.id)
    default:
      return state
  }
}
