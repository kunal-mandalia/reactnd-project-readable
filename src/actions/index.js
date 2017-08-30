import {
  API,
  FETCH_INITIAL_DATA_REQUEST,
  FETCH_INITIAL_DATA_ERROR,
  FETCH_INITIAL_DATA_SUCCESS
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
    .then((response) => {
      axios.get(`${API}/posts`)
      .then((postsResponse) => {
        const posts = postsResponse.data
        const getComments = posts.map(p => axios.get(`${API}/posts/${p.id}/comments`))
        axios.all(getComments)
        .then((commentsResponse) => {
          const comments = commentsResponse
                            .map(c => c.data)
                            .reduce((comments, comment) => {
                              return comments.concat(comment)
                            }, [])
          dispatch(fetchInitialDataSuccess({
            'categories': response.data.categories,
            'posts': postsResponse.data,
            'comments': comments,
          }))
        })
        .catch((commentError) => {
          dispatch(fetchInitialDataError(commentError))
        })
      })
      .catch((postsError) => {
        dispatch(fetchInitialDataError(postsError))    
      })
    })
    .catch((error) => {
      dispatch(fetchInitialDataError(error))
    })
  }
}
