import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'
import AdminUserCard from './AdminUserCard'

class AllUsers extends React.Component {
  componentDidMount(){
    this.props.loadUsers()
  }
  render(){
    return (
      <div>{this.props.users.map(user => <AdminUserCard key={user.id} user={user} />)}</div>
    )
  }

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