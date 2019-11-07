import React from 'react'
import {connect} from 'react-redux'

import {fetchUserView, updateUser} from '../../store/userView'

export class UserView extends React.Component {
  componentDidMount() {
    this.props.loadUserView(this.props.match.params.id)
  }
  render() {
    const {userView} = this.props

    return (
      <div id="UserView">
        <h3>firstName: {userView.firstName}</h3>
        <h3>lastName: {userView.lastName}</h3>
        <h3>Email: {userView.email}</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userView: state.userView
})

const mapDispatchToProps = dispatch => ({
  loadUserView: id => dispatch(fetchUserView(id)),
  updateUserView: updatedUser => dispatch(updateUser(updatedUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
