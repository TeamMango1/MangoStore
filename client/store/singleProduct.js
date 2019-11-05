import axios from 'axios'

const GOT_PROJECT = 'GOT_PRODUCT'

export const gotProduct = product => {
  return {
    type: GOT_PROJECT,
    product
  }
}

export const fetchProduct = id => {
  return async dispatch => {
    const {data} = axios.get(`api/products/${id}`)
    dispatch(gotProduct(data))
  }
}

export const editProduct = product => {
  return async dispatch => {
    const {data} = axios.put('api/products/', product)
    dispatch(gotProduct(data))
  }
}

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PROJECT: {
      return action.product
    }
    default: {
      return state
    }
  }
}

export default reducer
