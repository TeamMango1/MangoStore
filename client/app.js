import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import addProduct from './components/addProduct'

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Routes path="/products" component={AllProducts} />
        <Routes exact path="/products/:id" component={SingleProduct} />
        <Routes exact path="/products/add" component={addProduct} />
      </div>
    </div>
  )
}

export default App
