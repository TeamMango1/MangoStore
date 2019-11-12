import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'

const UserCard = props => {
  const user = props.user
  return (
    <div className="col-4 card">
      <Link to={`/adminhub/users/${user.id}`}>
        {user.firstName} {user.lastName}
      </Link>
      <div>{user.email}</div>
      <div className="container">
        <div className="row">
          <button
            type="button"
            className="btn btn-primary col-4"
            onClick={() => {props.triggerPasswordReset(user.id)
            toast.success(`Triggered a password reset for ${user.firstName}!`)}}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-success col-4"
            onClick={() => {
              props.promoteUser(user.id)
              toast.success(`${user.firstName} was promoted`)
            }}
          >
            Promote
          </button>
          <button
            type="button"
            className="btn btn-danger col-4"
            onClick={() => {
              props.deleteUser(user.id)
              toast.success(`${user.firstName} Ceased to Exist!`)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
