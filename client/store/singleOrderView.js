import axios from 'axios'

//ACTION TYPE
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const REMOVED_PRODUCT_FROM_ORDER = 'REMOVED_PRODUCT_FROM_ORDER'

//ACTION TYPE
export const gotSingleOrder = order => ({type: GOT_SINGLE_ORDER, order})
export const removedProduct = productId => ({
  type: REMOVED_PRODUCT_FROM_ORDER,
  productId
})


//THUNKS
export const fetchSingleOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotSingleOrder(data))
  } catch (error) {
    console.log(error)
  }
}

export const removeProductFromOrder = (
  productId,
  orderId
) => async dispatch => {
  try {
    await axios.delete('/api/orders/products', {data: {productId, orderId}})
    dispatch(removedProduct(productId))
  } catch (err) {
    console.log(err)
  }
}

export const editOrderStatus = (orderId, status) => async dispatch => {
  try {
    await axios.put('/api/orders', {orderId, status})
  } catch (err) {
    console.log(err)
  }
}

//STATE
const initialState = {
  products: [],
  user: {email: 'loading...'}
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_SINGLE_ORDER:
      return action.order
    case REMOVED_PRODUCT_FROM_ORDER:
    return {
      ...state,
      products: state.products.filter(
        product => product.id !== action.productId
      )
    }
    default:
      return state
  }
}


