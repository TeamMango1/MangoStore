import axios from 'axios'

const GOT_PRODUCT = 'GOT_PRODUCT'
const ADD_REVIEW = 'ADD_REVIEW';

export const gotProduct = product => {
  return {
    type: GOT_PRODUCT,
    product
  }
}

export const addReview = (review,productId,userId) =>({
  type:ADD_REVIEW,
  review,
  productId,
  userId
})

export const fetchProduct = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(gotProduct(data))
  }
}

export const editProduct = product => {
  return async dispatch => {
    const {data} = await axios.put('/api/products/', product)
    dispatch(gotProduct(data))
  }
}

export const postReview = (review,productId,userId) =>{
  return async dispatch =>{
    const {data} = await axios.post(`/api/products/${productId}`,{review,userId})
    dispatch(addReview(data))
  }
}


const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCT: {
      return action.product
    }
    case ADD_REVIEW:
      return action.review
    default: {
      return state
    }
  }
}

export default reducer
