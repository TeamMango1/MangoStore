import axios from 'axios'

// ACTION TYPES
const SET_SINGLE_USER = 'SET_SINGLE_USER' // edit + fetch will use this action type.
const DELETE_SINGLE_USER = 'DELETE_SINGLE_USER'

//ACTION CREATORS
export const setSingleUser = singleUser => ({type: SET_SINGLE_USER, singleUser})
export const deleteUserId = userId => ({type: DELETE_SINGLE_USER, userId})

//THUNKS
export const fetchSingleUser = function(userId) {
  return async dispatch => {
    try {
      let singleUser = await axios.get(`api/users/${userId}`)
      dispatch(setSingleUser(singleUser.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateUser = function(updatedUser) {
  try {
    return async dispatch => {
      await axios.put(`api/users/${updatedUser.id}`, {
        id: updatedUser.id,
        email: updatedUser.email,
        password: updatedUser.password,
        image: updatedUser.image
      })
      dispatch(setSingleUser(updatedUser))
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = function(userId) {
  try {
    return async dispatch => {
      await axios.delete(`api/users/${userId}`)
      dispatch(deleteUserId(userId))
    }
  } catch (error) {
    console.log(error)
  }
}

const singleUser = {}

export default function(state = singleUser, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.singleUser
    case DELETE_SINGLE_USER:
      return singleUser
    default:
      return state
  }
}
