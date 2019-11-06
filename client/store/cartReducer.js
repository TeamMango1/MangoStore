import axios from 'axios'

// ACTION TYPES
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GOT_CART = 'GOT_CART'

//ACTION CREATORS
export const gotCart = cart => ({type: GOT_CART, cart})
export const addToCart = item => ({type: ADD_TO_CART, item})
export const removeFromCart = productId => ({
  type: REMOVE_FROM_CART,
  id: productId
})

//THUNKS
export const fetchCart = function(userId) {
  return async dispatch => {
    try {
      let singleUser = await axios.get(`/api/users/${userId}`)
      dispatch(setSingleUser(singleUser.data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return [...state, action.item]
    }
    case REMOVE_FROM_CART: {
      return state.filter(item => item.id !== action.id)
    }
    case GOT_CART: {
      return action.cart
    }
    default:
      return state
  }
}
