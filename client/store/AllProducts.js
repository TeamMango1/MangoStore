import axios from 'axios'

const initialState = []

//action type
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
//action creator
export const gotProducts = products => {
  return {type: GOT_PRODUCTS, products}
}
export const addProduct = product => {
  return {type: ADD_PRODUCT, product}
}

//THUNK
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const allProducts = await axios.get('api/products')
      dispatch(gotProducts(allProducts))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}
export const postProduct = product => {
  return async dispatch => {
    try {
      const newProduct = await axios.post('api/products', product)
      dispatch(addProduct(newProduct))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return action.product
    default:
      return state
  }
}
