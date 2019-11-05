import React from 'react'
import {connect} from 'react-redux'

import {fetchSingleUser, updateUser} from '../store/singleUser'

export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.loadSingleUser(this.props.match.params.userId)
  }
  render() {
    const {singleUser} = this.props

    return (
      <div id="singleUser">
        <h3>Name: {singleUser.name}</h3>
        <h3>Email: {singleUser.email}</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleUser: state.singleUser
})

const mapDispatchToProps = dispatch => ({
  loadSingleUser: id => dispatch(fetchSingleUser(id)),
  updateSingleUser: updatedUser => dispatch(updateUser(updatedUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
