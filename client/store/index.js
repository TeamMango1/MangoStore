import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProduct from './singleProduct'
import allProducts from './allProductsReducer'
import allUsers from './allUsers'
import userView from './userView'
import cart from './cartReducer'
import selectedProductFilter from './selectedProductFilter'

const reducer = combineReducers({
  user,
  allUsers,
  userView,
  allProducts,
  singleProduct,
  cart,
  selectedProductFilter
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
