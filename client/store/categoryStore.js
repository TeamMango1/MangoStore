import axios from 'axios'

//action type
const GOT_CATEGORIES='GOT_CATEGORIES'

//action creator
export const gotCategories=(categories) => {
  return {type:GOT_CATEGORIES,categories}
}

//THUNK
export const fetchCategories = ()=>{
  return async dispatch =>{
    try {
      const {data} = await axios.get('/api/categories')
      dispatch(gotCategories(data))
    } catch (err) {
      console.log('ERROR',err)
    }
  }
}
const initialState = []
export default (state=initialState,action)=>{
  switch (action.type){
    case GOT_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
