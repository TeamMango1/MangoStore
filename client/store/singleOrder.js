import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'
const REMOVED_PRODUCT_FROM_ORDER = 'REMOVED_PRODUCT_FROM_ORDER'

export const gotOrder = order => ({type: GOT_ORDER, order})

export const removedProduct = productId => ({
  type: REMOVED_PRODUCT_FROM_ORDER,
  productId
})

export const fetchOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const editOrderStatus = (orderId, status) => async dispatch => {
  try {
    await axios.put('/api/orders', {orderId, status})
  } catch (err) {
    console.log(err)
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

const initialState = {
  products: [],
  user: {email: 'loading...'}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER:
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
