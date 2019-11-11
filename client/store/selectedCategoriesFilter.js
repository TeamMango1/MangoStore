const SET_CATEGORIES_FILTER = 'SET_CATEGORIES_FILTER'
const CLEAR_CATEGORIES_FILTER = 'CLEAR_CATEGORIES_FILTER'


export const setCategoriesFilter = filter =>({
  type: SET_CATEGORIES_FILTER,
  filter
})

export const clearCategoriesFilter = () =>({
  type:CLEAR_CATEGORIES_FILTER
})
const initialState = []


export default (state = initialState, action)=>{
  switch(action.type){
    case SET_CATEGORIES_FILTER:
      return [...state,action.filter]
    case CLEAR_CATEGORIES_FILTER:
      return initialState;
    default:
      return state;
  }
}

