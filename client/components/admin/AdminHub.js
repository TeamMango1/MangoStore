import React from 'react'
import {Route, Switch} from 'react-router-dom'

import {
  AdminNavbar,
  AdminProducts,
  AdminSingleProduct,
  AdminUsers,
  AdminSingleUser,
  AdminOrders
} from './'

class AdminHub extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AdminNavbar />
        <Switch>
          <Route exact path="/adminhub/products" component={AdminProducts} />
          <Route path="/adminhub/products/:id" component={AdminSingleProduct} />

          <Route exact path="/adminhub/users" component={AdminUsers} />
          <Route path="/adminhub/users/:id" component={AdminSingleUser} />

          <Route path="/adminhub/orders" component={AdminOrders} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default AdminHub
