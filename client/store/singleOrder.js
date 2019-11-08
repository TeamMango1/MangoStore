import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'

const initialState = {}

export const gotOrder = order => ({type: GOT_ORDER, order})

export const fetchOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const editOrderStatus = (orderId, status) => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders', {orderId, status})
    dispatch(gotOrder(data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER:
      return action.order
    default:
      return state
  }
}
