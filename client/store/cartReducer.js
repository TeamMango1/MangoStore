import axios from 'axios'

// ACTION TYPES
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GOT_CART = 'GOT_CART'

//ACTION CREATORS
export const gotCart = cart => ({type: GOT_CART, cart})
export const addedToCart = item => ({type: ADD_TO_CART, item})
export const removedFromCart = productId => ({
  type: REMOVE_FROM_CART,
  id: productId
})

//THUNKS
export const fetchCart = function() {
  return async dispatch => {
    try {
      console.log('in reducer')

      let {data} = await axios.get(`/api/cart`)
      console.log('DATA',data)
      dispatch(gotCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCart = (productId, userId) => {
  return async dispatch => {
    try {
      let {data} = await axios.post(`/api/cart`, {productId, userId})
      dispatch(addedToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeFromCart = (productId, userId) => {
  return async dispatch => {
    try {
      let {data} = await axios.delete(`/api/cart`, {productId, userId})
      dispatch(removedFromCart(data))
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
