import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const initialState = []

const gotOrders = users => ({type: GET_ORDERS, users})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders')
    dispatch(gotOrders(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
