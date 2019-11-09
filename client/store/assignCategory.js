import axios from 'axios'

//action type
const SET_CATEGORY = 'SET_CATEGORY'

//action creator
const setCategory = (productcategory) =>(
    {type:SET_CATEGORY, productcategory}
)

//Thunk
export const assignCategory = (categoryId,productId)=> {
    return async dispatch =>{
        try {
            await axios.post(`/api/products/${productId}/productcategory`,{categoryId,productId})
            dispatch(setCategory({categoryId,productId}))
        } catch (err) {
            console.log('ERROR',err)
        }
      }
}
const inititalState={}
export default (state = inititalState, action) =>{
  switch(action.type){
    case SET_CATEGORY:
      return action.productcategory
    default:
      return state
  }
}
