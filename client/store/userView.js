import axios from 'axios'

// ACTION TYPES
const SET_SINGLE_USER = 'SET_SINGLE_USER' // edit + fetch will use this action type.

//ACTION CREATORS
export const setSingleUser = singleUser => ({type: SET_SINGLE_USER, singleUser})

//THUNKS
export const fetchUserView = function(userId) {
  return async dispatch => {
    try {
      let singleUser = await axios.get(`/api/users/${userId}`)
      dispatch(setSingleUser(singleUser.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateUser = function(updatedUser) {
  return async dispatch => {
    try {
      await axios.put(`/api/users/${updatedUser.id}`, {
        id: updatedUser.id,
        email: updatedUser.email,
        password: updatedUser.password,
        image: updatedUser.image
      })
      dispatch(setSingleUser(updatedUser))
    } catch (error) {
      console.log(error)
    }
  }
}

const singleUser = {}

export default function(state = singleUser, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.singleUser
    default:
      return state
  }
}
