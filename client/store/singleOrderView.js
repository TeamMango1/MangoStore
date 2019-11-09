import axios from 'axios'

//ACTION TYPE
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'

//ACTION TYPE
export const gotSingleOrder = order => ({type: GET_SINGLE_ORDER, order})


//THUNK
export const fetchSingleOrder = id => async dispatch => {
  try {
    console.log(id)
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotSingleOrder(data))
  } catch (error) {
    console.log(error)
  }
}



let initialState = {}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return action.order
    default:
      return state
  }
}


