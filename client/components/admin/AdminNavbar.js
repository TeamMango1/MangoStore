import React from "react"
import {NavLink} from "react-router-dom"

const AdminNavbar = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink
          to="/adminhub/products"
          className="nav-link"
          activeClassName="nav-link active"
          href="#"
        >
          Products
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/adminhub/users"
          className="nav-link"
          activeClassName="nav-link active"
          href="#"
        >
          Users
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/adminhub/orders"
          className="nav-link"
          activeClassName="nav-link active"
          href="#"
        >
          Orders
        </NavLink>
      </li>
    </ul>
  )
}

export default AdminNavbar