import axios from 'axios'

//action type
const SET_CATEGORY = 'SET_CATEGORY'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'
//action creator
const setCategory = productcategory => ({type: SET_CATEGORY, productcategory})
const removeCategory = productcategory => ({
  type: REMOVE_CATEGORY,
  productcategory
})

//Thunk
export const assignCategory = (categoryId, productId) => {
  return async dispatch => {
    try {
      await axios.post(`/api/products/${productId}/productcategory`, {
        categoryId,
        productId
      })
      dispatch(setCategory({categoryId, productId}))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}
export const unassignCategory = (categoryId, productId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/products/${productId}/productcategory`, {
        categoryId,
        productId
      })
      dispatch(removeCategory({categoryId, productId}))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}
const inititalState = {}
export default (state = inititalState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.productcategory
    case REMOVE_CATEGORY:
      return action.productcategory
    default:
      return state
  }
}
