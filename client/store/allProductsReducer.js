import axios from 'axios'

const initialState = []

//action type
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
//action creator
export const gotProducts = products => {
  return {type: GOT_PRODUCTS, products}
}
export const addProduct = product => {
  return {type: ADD_PRODUCT, product}
}
export const deleteProduct = id =>{
  return {type: DELETE_PRODUCT, id}
}
//THUNK
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(gotProducts(data))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}
export const postProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(addProduct(data))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}
export const removeProduct = id => {
  return async dispatch =>{
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deleteProduct(id))
    } catch (err) {
      console.log('ERROR',err)
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
    case DELETE_PRODUCT:
      return state.filter(product=> product.id!==action.id )
    default:
      return state
  }
}
