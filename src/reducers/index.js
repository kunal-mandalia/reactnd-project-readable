import {
  API,
  FETCH_INITIAL_DATA_REQUEST,
  FETCH_INITIAL_DATA_ERROR,
  FETCH_INITIAL_DATA_SUCCESS
} from '../constants/index'

const initialState = {
  app: `readable`,
  categories: [],
  comments: [],  
  posts: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INITIAL_DATA_SUCCESS:
      return Object.assign({}, state, { ...action.value })
    default:
      return state
  }
}

export default reducer
