import React from 'react'
import {connect} from 'react-redux'

const UserCard = props => {
  return (
    <div>
      <div>
        {props.user.firstName} {props.user.lastName}
      </div>
      <div>{props.user.email}</div>
    </div>
  )
}

export default UserCard
