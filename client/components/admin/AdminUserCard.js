import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

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
            onClick={() => props.triggerPasswordReset(user.id)}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-success col-4"
            onClick={() => props.promoteUser(user.id)}
          >
            Promote
          </button>
          <button
            type="button"
            className="btn btn-danger col-4"
            onClick={() => props.deleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
