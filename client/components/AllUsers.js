import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'
import UserCard from './UserCard'

const AllUsers = props => {
  return (
    <div>{props.users.map(user => <UserCard key={user.id} user={user} />)}</div>
  )
}

const mapState = state => {
  return {
    users: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
