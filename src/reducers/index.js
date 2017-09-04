import * as c from '../constants/index'

const initialState = {
  app: `readable`,
  categories: [],
  comments: [],
  posts: [],
  updates: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.FETCH_INITIAL_DATA_SUCCESS:
      return {...state, ...action.value}
    case c.EDIT_POST_REQUEST:
      return {
        ...state,
        updates: {
          ...state.updates,
          [action.id]: {
            type: c.EDIT,
            status: c.REQUEST
          }
        }
      }
    case c.EDIT_POST_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.id]: action.post
        },
        updates: {
          ...state.updates,
          [action.post.id]: {
            type: c.EDIT,
            status: c.SUCCESS
          }
        }
      }
    case c.EDIT_POST_BEGIN:
      return {
        ...state,
        updates: {
          ...state.updates,
          [action.id]: {
            type: c.EDIT,
            status: c.EDIT_MODE
          }
        }
      }
    case c.EDIT_POST_END:
      return {
        ...state,
        updates: {
          ...state.updates,
          [action.id]: {
            type: c.EDIT,
            status: c.CANCEL
          }
        }
      }
    default:
      return state
  }
}

export default reducer
