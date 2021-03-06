import React from 'react'
import {Route, Switch} from 'react-router-dom'

import {
  AdminNavbar,
  AdminProducts,
  AdminSingleProduct,
  AdminEditSingleProduct,
  AdminUsers,
  AdminSingleUser,
  AdminOrders,
  AdminSingleOrder
} from './'

class AdminHub extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AdminNavbar />
        <Switch>
          <Route exact path="/adminhub/products" component={AdminProducts} />
          <Route
            exact
            path="/adminhub/products/:id"
            component={AdminSingleProduct}
          />
          <Route
            path="/adminhub/products/:id/edit"
            component={AdminEditSingleProduct}
          />

          <Route exact path="/adminhub/users" component={AdminUsers} />
          <Route path="/adminhub/users/:id" component={AdminSingleUser} />

          <Route exact path="/adminhub/orders" component={AdminOrders} />
          <Route path="/adminhub/orders/:id" component={AdminSingleOrder} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default AdminHub
