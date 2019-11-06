import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProduct from './singleProduct'
<<<<<<< HEAD
import allProducts from './AllProducts'
import allUsers from './allUsers'

const reducer = combineReducers({user, allProducts, singleProduct, allUser})

<<<<<<< HEAD
const reducer = combineReducers({user, allProducts, singleProduct})
=======

const reducer = combineReducers({user, singleProduct})
>>>>>>> 3253b76bbe3663de89e0c68c016d254883f59439
=======
>>>>>>> e8ec1c2e082d16bdf38ab77e28ed997f409d1643
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
