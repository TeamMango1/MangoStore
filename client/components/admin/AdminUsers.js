import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, deleteUser} from '../../store/allUsers'
import AdminUserCard from './AdminUserCard'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.loadUsers()
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.users.map(user => (
            <AdminUserCard
              key={user.id}
              user={user}
              deleteUser={this.props.deleteUser}
            />
          ))}
        </div>
      </div>
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
    loadUsers: () => dispatch(fetchUsers()),
    deleteUser: id => dispatch(deleteUser(id))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
