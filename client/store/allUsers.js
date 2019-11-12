import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const DELETE_SINGLE_USER = 'DELETE_SINGLE_USER'
const CHANGE_USER_INFO = 'CHANGE_USER_INFO'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const deleteUserId = userId => ({type: DELETE_SINGLE_USER, userId})
const changeUserInfo = userId => ({type: CHANGE_USER_INFO, userId})

/**
 * THUNK CREATORS
 */
export const fetchUsers = pageNum => async dispatch => {
  try {
    const res = await axios.get('/api/users', {params:{pageNum}})
    dispatch(getUsers(res.data || defaultUsers))
  } catch (err) {
    console.error(err)
  }
}
export const deleteUser = function(userId) {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}`, {data: {userId}})
      dispatch(deleteUserId(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const promoteUser = function(userId) {
  return async dispatch => {
    try {
      await axios.patch(`/api/users/${userId}`, {userId})
      dispatch(changeUserInfo(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const triggerPasswordReset = function(userId) {
  return async dispatch => {
    try {
      await axios.patch(`/api/users/triggerpasswordreset/${userId}`, {
        userId
      })
      dispatch(changeUserInfo(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const resetPassword = function(userId, password) {
  return async dispatch => {
    try {
      await axios.patch(`api/users/passwordreset/${userId}`, {userId, password})
      dispatch(changeUserInfo(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case DELETE_SINGLE_USER:
      return state.filter(user => {
        return user.id !== action.userId
      })
    case CHANGE_USER_INFO:
      return state.map(user => {
        return user
      })
    default:
      return state
  }
}
