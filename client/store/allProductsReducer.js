import axios from 'axios'
import history from '../history'
const initialState = []

//action type
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
//action creator
export const gotProducts = products => {
  return {type: GOT_PRODUCTS, products}
}
export const addProduct = product => {
  return {type: ADD_PRODUCT, product}
}
export const deleteProduct = id => {
  return {type: DELETE_PRODUCT, id}
}
export const editProduct = (product, id) => {
  return {type: EDIT_PRODUCT, product, id}
}
//THUNK
export const fetchProducts = pageNum => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products',{params:{pageNum}})
      console.log('DATA:::', data)
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
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deleteProduct(id))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}
export const updateProduct = (product, id) => {
  return async dispatch => {
    try {
      await axios.put(`/api/products/${id}`, product)
      dispatch(editProduct(product, id))
      history.push('/adminhub/products')
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
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.id)
    case EDIT_PRODUCT:
      return state.map(product => {
        if (product.id === action.id) {
          return {id: action.id, ...action.product}
        } else {
          return product
        }
      })
    default:
      return state
  }
}
