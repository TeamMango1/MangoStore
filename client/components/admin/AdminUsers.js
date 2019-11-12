import React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {
  fetchUsers,
  deleteUser,
  promoteUser,
  triggerPasswordReset
} from '../../store/allUsers'
import AdminUserCard from './AdminUserCard'

export class AllUsers extends React.Component {
  constructor(){
    super()
    this.state = {
      page:1
    }

    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)

  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    this.setState({page: Number(values.page)})
    this.props.loadUsers(values.page)
  }

  async handleNextClick(){
    await this.props.loadUsers(this.state.page + 1)
    this.props.history.push(`/adminhub/users?page=${this.state.page + 1}`)
    this.setState({ page: this.state.page + 1})
    console.log(this.state)
  }

  async handlePrevClick(){
    await this.props.loadUsers(this.state.page - 1)
    this.props.history.push(`/adminhub/users?page=${this.state.page - 1}`)
    this.setState({ page: this.state.page - 1})
    console.log(this.state)

  }


  render() {
    const values = queryString.parse(this.props.location.search)

    return (
      <div className="container">
        <div className="row">
          {this.props.users.map(user => (
            <AdminUserCard
              key={user.id}
              user={user}
              deleteUser={this.props.deleteUser}
              promoteUser={this.props.promoteUser}
              triggerPasswordReset={this.props.triggerPasswordReset}
            />
          ))}
        </div>
        <button type="button" onClick={this.handleNextClick}>
          Next Page
        </button>
        {values.page > 1 ? (
          <button type="button" onClick={this.handlePrevClick}>
            Previous Page
          </button>
        ) : (
          <div />
        )}
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
    loadUsers: pageNum => dispatch(fetchUsers(pageNum)),
    deleteUser: id => dispatch(deleteUser(id)),
    promoteUser: id => dispatch(promoteUser(id)),
    triggerPasswordReset: id => dispatch(triggerPasswordReset(id))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
