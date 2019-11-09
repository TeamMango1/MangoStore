import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const EDITED_ORDER_STATUS = 'EDITED_ORDER_STATUS'
const DELETED_ORDER = 'DELETED_ORDER'
const CHANGE_FILTER = 'CHANGE_FILTER'

const initialState = {
  orders: [],
  filter: null
}

export const gotOrders = orders => ({type: GET_ORDERS, orders})
export const editedStatus = order => ({type: EDITED_ORDER_STATUS, order})
export const deletedOrder = id => ({type: DELETED_ORDER, id})
export const changeFilter = filter => ({type: CHANGE_FILTER, filter})

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
      return {...state, orders: action.orders}
    case EDITED_ORDER_STATUS:
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.id === action.order.id) {
            return action.order
          }
          return order
        })
      }
    case DELETED_ORDER:
      return {...state, orders: state.filter(order => order.id !== action.id)}
    case CHANGE_FILTER:
      return {...state, filter: action.filter}
    default:
      return state
  }
}
