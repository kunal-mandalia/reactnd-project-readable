import * as c from '../constants/index'

import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'auth-string';

export const fetchInitialDataRequest = () => ({ type: c.FETCH_INITIAL_DATA_REQUEST })
export const fetchInitialDataError = (error) => ({ type: c.FETCH_INITIAL_DATA_ERROR, error })
export const fetchInitialDataSuccess = (data) => ({ type: c.FETCH_INITIAL_DATA_SUCCESS, value: data })
export const fetchInitialData = () => {
  return (dispatch) => {
    dispatch(fetchInitialDataRequest())
    return axios.get(`${c.API}/categories`)
    .then((categoriesResponse) => {
      axios.get(`${c.API}/posts`)
      .then((postsResponse) => {
        const getComments = postsResponse.data.map(p => axios.get(`${c.API}/posts/${p.id}/comments`))
        axios.all(getComments)
        .then((commentsResponse) => {
          const categories = categoriesResponse.data.categories
            .reduce((categories, category) => ({ ...categories, [category.name]: category}), {})
          const comments = commentsResponse
            .map(c => c.data)
            .reduce((comments, comment) => comments.concat(comment))
            .reduce((comments, comment) => ({ ...comments, [comment.id]: comment }), {})
          
          const parentIds = commentsResponse
            .map(c => c.data).reduce((comments, comment) => comments.concat(comment), [])
            .map(comment => comment.parentId)

          // filter for undeleted or posts with children
          const posts = postsResponse.data.filter(post => (post.deleted === false || parentIds.includes(post.id)))
            .reduce((posts, post) => ({ ...posts, [post.id]: post }), {})
          dispatch(fetchInitialDataSuccess({ categories, posts, comments }))
        })
        .catch((commentsError) => { dispatch(fetchInitialDataError(commentsError)) })
      })
      .catch((postsError) => { dispatch(fetchInitialDataError(postsError)) })
    })
    .catch((categoriesError) => { dispatch(fetchInitialDataError(categoriesError)) })
  }
}


export const editPostRequest = ({ id, title, body }) => ({ type: c.EDIT_POST_REQUEST, id, title, body })
export const editPostError = (error) => ({ type: c.EDIT_POST_ERROR, error })
export const editPostSuccess = (post) => ({ type: c.EDIT_POST_SUCCESS, post })
export const editPost = ({ id, title, body }) => {
  return (dispatch) => {
    dispatch(editPostRequest({ id, title, body }))
    axios.put(`${c.API}/posts/${id}`, { title, body })
    .then((response) => { dispatch(editPostSuccess(response.data)) })
    .catch((error) => { dispatch(editPostError(error)) })
  }
}

export const editCommentRequest = ({ id, body }) => ({ type: c.EDIT_COMMENT_REQUEST, id, body })
export const editCommentError = (error) => ({ type: c.EDIT_COMMENT_ERROR, error })
export const editCommentSuccess = (comment) => ({ type: c.EDIT_COMMENT_SUCCESS, comment })
export const editComment = ({ id, body }) => {
  debugger
  return (dispatch) => {
    dispatch(editCommentRequest({ id, body }))
    axios.put(`${c.API}/comments/${id}`, { body })
    .then((response) => { dispatch(editCommentSuccess(response.data)) })
    .catch((error) => { dispatch(editCommentError(error)) })
  }
}

export const votePostRequest = ({ id, upVote }) => ({ type: c.VOTE_POST_REQUEST, id, upVote })
export const votePostError = (error) => ({ type: c.VOTE_POST_ERROR, error })
export const votePostSuccess = (post) => ({ type: c.VOTE_POST_SUCCESS, post })
export const votePost = ({ id, upVote }) => {
  return (dispatch) => {
    dispatch(votePostRequest({ id, upVote }))
    axios.post(`${c.API}/posts/${id}`, { option: upVote ? 'upVote' : 'downVote' })
    .then((response) => { dispatch(votePostSuccess(response.data)) })
    .catch((error) => { dispatch(votePostError(error)) })
  }
}

export const voteCommentRequest = ({ id, upVote }) => ({ type: c.VOTE_COMMENT_REQUEST, id, upVote })
export const voteCommentError = (error) => ({ type: c.VOTE_COMMENT_ERROR, error })
export const voteCommentSuccess = (comment) => ({ type: c.VOTE_COMMENT_SUCCESS, comment })
export const voteComment = ({ id, upVote }) => {
  return (dispatch) => {
    dispatch(voteCommentRequest({ id, upVote }))
    axios.post(`${c.API}/comments/${id}`, { option: upVote ? 'upVote' : 'downVote' })
    .then((response) => { dispatch(voteCommentSuccess(response.data)) })
    .catch((error) => { dispatch(voteCommentError(error)) })
  }
}

export const deletePostRequest = id => ({ type: c.DELETE_POST_REQUEST, id })
export const deletePostError = error => ({ type: c.DELETE_POST_ERROR, error })
export const deletePostSuccess = id => ({ type: c.DELETE_POST_SUCCESS, id })
export const deletePost = (id) => {
  return (dispatch) => {
    dispatch(deletePostRequest(id))
    axios.delete(`${c.API}/posts/${id}`)
    .then((response) => { dispatch(deletePostSuccess(id)) })
    .catch((error) => { dispatch(deletePostError(error)) })
  }
}

export const deleteCommentRequest = id => ({ type: c.DELETE_COMMENT_REQUEST, id })
export const deleteCommentError = error => ({ type: c.DELETE_COMMENT_ERROR, error })
export const deleteCommentSuccess = id => ({ type: c.DELETE_COMMENT_SUCCESS, id })
export const deleteComment = (id) => {
  return (dispatch) => {
    dispatch(deleteCommentRequest(id))
    axios.delete(`${c.API}/comments/${id}`)
    .then((response) => { dispatch(deleteCommentSuccess(id)) })
    .catch((error) => { dispatch(deleteCommentError(error)) })
  }
}

export const createPostRequest = post => ({ type: c.CREATE_POST_REQUEST, post })
export const createPostError = error => ({ type: c.CREATE_POST_ERROR, error })
export const createPostSuccess = post => ({ type: c.CREATE_POST_SUCCESS, post })
export const createPost = (post) => {
  return (dispatch) => {
    dispatch(createPostRequest(post))
    axios.post(`${c.API}/posts/`, post)
    .then((response) => { dispatch(createPostSuccess(response.data)) })
    .catch((error) => { dispatch(createPostError(error)) })
  }
}

export const createCommentRequest = comment => ({ type: c.CREATE_COMMENT_REQUEST, comment })
export const createCommentError = error => ({ type: c.CREATE_COMMENT_ERROR, error })
export const createCommentSuccess = comment => ({ type: c.CREATE_COMMENT_SUCCESS, comment })
export const createComment = (comment) => {
  return (dispatch) => {
    dispatch(createCommentRequest(comment))
    axios.post(`${c.API}/comments/`, comment)
    .then((response) => { dispatch(createCommentSuccess(response.data)) })
    .catch((error) => { dispatch(createCommentError(error)) })
  }
}

export const beginEditPost = id => ({ type: c.EDIT_POST_BEGIN, id })
export const endEditPost = id => ({ type: c.EDIT_POST_END, id })

export const beginEditComment = id => ({ type: c.EDIT_COMMENT_BEGIN, id })
export const endEditComment = id => ({ type: c.EDIT_COMMENT_END, id })

export const newPostShow = () => ({ type: c.NEW_POST_SHOW })
export const newPostHide = () => ({ type: c.NEW_POST_HIDE })

export const newCommentShow = parentId => ({ type: c.NEW_COMMENT_SHOW, parentId })
export const newCommentHide = () => ({ type: c.NEW_COMMENT_HIDE })

export const sortByDate = (descending = true) => ({ type: c.SORT_BY_DATE, descending })
export const sortByVotes = (descending = true) => ({ type: c.SORT_BY_VOTES, descending })