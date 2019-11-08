import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import cart from './cartReducer'
import allCategories from './categoryStore'
import allUsers from './allUsers'
import user from './user'
import userView from './userView'
import allProducts from './allProductsReducer'
import singleProduct from './singleProduct'
import selectedProductFilter from './selectedProductFilter'
import orders from './orders'
import singleOrder from './singleOrder'

const reducer = combineReducers({
  user,
  allUsers,
  userView,
  allProducts,
  singleProduct,
  selectedProductFilter,
  cart,
  allCategories,
  orders,
  singleOrder
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
