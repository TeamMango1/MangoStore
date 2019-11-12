import axios from 'axios'

//ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'
const EDITED_ORDER_STATUS = 'EDITED_ORDER_STATUS'
const DELETED_ORDER = 'DELETED_ORDER'
const CHANGE_FILTER = 'CHANGE_FILTER'
const GET_SINGLE_USER_ORDERS = 'GET_SINGLE_USER_ORDERS'


//ACTION CREATORS
export const gotOrders = orders => ({type: GET_ORDERS, orders})
export const editedStatus = order => ({type: EDITED_ORDER_STATUS, order})
export const deletedOrder = id => ({type: DELETED_ORDER, id})
export const changeFilter = filter => ({type: CHANGE_FILTER, filter})
export const getSingleUserOrders = orders =>({type:GET_SINGLE_USER_ORDERS,orders})

// THUNK CREATORS
export const fetchSingleUserOrders = () => async dispatch => {
  try{
    const {data} = await axios.get(`api/orders/singleUser`)
    dispatch(getSingleUserOrders(data))
  } catch(error){
    console.log(error)
  }
}

export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    console.log(data)
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

const initialState = {
  orders: [],
  filter: null
}

//REDUCER
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
    case GET_SINGLE_USER_ORDERS:
      return {...state, orders:action.orders.filter(order => order.status !== 'CART')}
    default:
      return state
  }
}
