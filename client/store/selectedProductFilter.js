const SET_FILTER = 'SET_FILTER'
const CLEAR_FILTER = 'CLEAR_FILTER'


export const setFilter = filter =>({
  type: SET_FILTER,
  filter
})

export const clearFilter = () =>({
  type:CLEAR_FILTER
})
const initialState = null

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case SET_FILTER:
      return action.filter
    case CLEAR_FILTER:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
