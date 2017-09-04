import * as c from '../constants/index'

const initialState = {
  app: `readable`,
  categories: [],
  comments: [],
  posts: [],
  updates: {}
}

const updatePost = ({ state, post, update }) => ({
  ...state,
  posts: {
    ...state.posts,
    [post.id]: post
  },
  updates: {
    ...state.updates,
    [post.id]: update
  }
})

const updateComment = ({ state, comment, update }) => ({
  ...state,
  comments: {
    ...state.comments,
    [comment.id]: comment
  },
  updates: {
    ...state.updates,
    [comment.id]: update
  }
})

const deletePost = ({ state, id }) => ({
  ...state,
  posts: {
    ...state.posts,
    [id]: {
      ...state.posts[id],
      deleted: true
    }
  },
  updates: {
    ...state.updates,
    [id]: {
      type: c.DELETE,
      status: c.SUCCESS
    }
  }
})

const deleteComment = ({ state, id }) => ({
  ...state,
  comments: {
    ...state.comments,
    [id]: {
      ...state.comments[id],
      deleted: true
    }
  },
  updates: {
    ...state.updates,
    [id]: {
      type: c.DELETE,
      status: c.SUCCESS
    }
  }
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.FETCH_INITIAL_DATA_SUCCESS:
      return {...state, ...action.value}

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
      return updatePost({
        state,
        post: action.post,
        update: { type: c.EDIT, status: c.SUCCESS }
      })

    case c.EDIT_COMMENT_BEGIN:
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
    case c.EDIT_COMMENT_END:
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
    case c.EDIT_COMMENT_REQUEST:
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
    case c.EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        },
        updates: {
          ...state.updates,
          [action.comment.id]: {
            type: c.EDIT,
            status: c.SUCCESS
          }
        }
      }
    case c.VOTE_POST_SUCCESS:
      return updatePost({
        state,
        post: action.post,
        update: { type: c.VOTE, status: c.SUCCESS }
      })

    case c.VOTE_COMMENT_SUCCESS:
      return updateComment({
        state,
        comment: action.comment,
        update: { type: c.DELETE, status: c.SUCCESS }
      })

    case c.DELETE_POST_SUCCESS:
      return deletePost({
        state,
        id: action.id
      })

    case c.DELETE_COMMENT_SUCCESS:
      return deleteComment({
        state,
        id: action.id
      })

    default:
      return state
  }
}

export default reducer
