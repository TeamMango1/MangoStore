import axios from 'axios'

// ACTION TYPES
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GOT_CART = 'GOT_CART'
const CHECKED_OUT_CART = 'CHECKED_OUT_CART'

//ACTION CREATORS
export const gotCart = cart => ({type: GOT_CART, cart})
export const addedToCart = item => ({type: ADD_TO_CART, item})
export const checkedOutCart = () => ({type: CHECKED_OUT_CART})
export const removedFromCart = productId => ({
  type: REMOVE_FROM_CART,
  id: productId
})

//THUNKS
export const fetchCart = function() {
  return async dispatch => {
    try {
      let {data} = await axios.get(`/api/cart`)
      dispatch(gotCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCart = (productId, quantity) => {
  return async dispatch => {
    try {
      let {data} = await axios.post(`/api/cart`, {productId, quantity})
      dispatch(addedToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutCart = (address, email) => {
  return async dispatch => {
    try {
      await axios.put('/api/cart', {address, email})
      dispatch(checkedOutCart())
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeFromCart = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cart`, {data: {productId}})
      dispatch(removedFromCart(productId))
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
    case CHECKED_OUT_CART: {
      return initialState
    }
    default:
      return state
  }
}
