import {
  API,

  FETCH_INITIAL_DATA_REQUEST,
  FETCH_INITIAL_DATA_ERROR,
  FETCH_INITIAL_DATA_SUCCESS,

  EDIT_POST_REQUEST,
  EDIT_POST_ERROR,
  EDIT_POST_SUCCESS,

  EDIT_POST_BEGIN,
  EDIT_POST_END
} from '../constants/index'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'auth-string';

export const fetchInitialDataRequest = () => ({ type: FETCH_INITIAL_DATA_REQUEST })
export const fetchInitialDataError = (error) => ({ type: FETCH_INITIAL_DATA_ERROR, error })
export const fetchInitialDataSuccess = (data) => ({ type: FETCH_INITIAL_DATA_SUCCESS, value: data })
export const fetchInitialData = () => {
  return (dispatch) => {
    dispatch(fetchInitialDataRequest())
    return axios.get(`${API}/categories`)
    .then((categoriesResponse) => {
      axios.get(`${API}/posts`)
      .then((postsResponse) => {
        const getComments = postsResponse.data.map(p => axios.get(`${API}/posts/${p.id}/comments`))
        axios.all(getComments)
        .then((commentsResponse) => {
          const categories = categoriesResponse.data.categories
                              .reduce((categories, category) => ({ ...categories, [category.name]: category}), {})
          const posts = postsResponse.data.reduce((posts, post) => ({ ...posts, [post.id]: post }), {})
          const comments = commentsResponse
                            .map(c => c.data)
                            .reduce((comments, comment) => comments.concat(comment))
                            .reduce((comments, comment) => ({ ...comments, [comment.id]: comment }), {})
          dispatch(fetchInitialDataSuccess({ categories, posts, comments }))
        })
        .catch((commentsError) => { dispatch(fetchInitialDataError(commentsError)) })
      })
      .catch((postsError) => { dispatch(fetchInitialDataError(postsError)) })
    })
    .catch((categoriesError) => { dispatch(fetchInitialDataError(categoriesError)) })
  }
}


export const editPostRequest = ({ id, title, body }) => ({ type: EDIT_POST_REQUEST, id, title, body })
export const editPostError = (error) => ({ type: EDIT_POST_ERROR, error })
export const editPostSuccess = (post) => ({ type: EDIT_POST_SUCCESS, post })
export const editPost = ({ id, title, body }) => {
  return (dispatch) => {
    dispatch(editPostRequest({ id, title, body }))
    axios.put(`${API}/posts/${id}`, { title, body })
    .then((response) => { dispatch(editPostSuccess(response.data)) })
    .catch((error) => { dispatchEvent(editPostError(error)) })
  }
}

export const beginEditPost = id => ({ type: EDIT_POST_BEGIN, id })
export const endEditPost = id => ({ type: EDIT_POST_END, id })
