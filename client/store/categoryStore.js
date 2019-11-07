import axios from 'axios'

//action type
const GOT_CATEGORIES = 'GOT_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
//action creator
export const gotCategories=(categories) => {
  return {type:GOT_CATEGORIES,categories}
}
export const addCategory=(category) =>{
  return {type:ADD_CATEGORY,category}
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
export const postCategory = (category) =>{
  return async dispatch =>{
    try {
      const {data}=await axios.post('/api/categories',category)
      dispatch(addCategory(data))
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
    case ADD_CATEGORY:
      return action.category
    default:
      return state
  }
}
