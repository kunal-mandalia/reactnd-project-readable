export const API = process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : ''

export const FETCH_INITIAL_DATA_REQUEST = 'FETCH_INITIAL_DATA_REQUEST'
export const FETCH_INITIAL_DATA_ERROR = 'FETCH_INITIAL_DATA_ERROR'
export const FETCH_INITIAL_DATA_SUCCESS = 'FETCH_INITIAL_DATA_SUCCESS'

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST'
export const EDIT_POST_ERROR = 'EDIT_POST_ERROR'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST'
export const EDIT_COMMENT_ERROR = 'EDIT_COMMENT_ERROR'
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS'

export const VOTE = 'STATUS_UPDATE/TYPE/VOTE'
export const EDIT_MODE = 'STATUS_UPDATE/TYPE/EDIT_MODE'
export const EDIT = 'STATUS_UPDATE/TYPE/EDIT'
export const SAVE = 'STATUS_UPDATE/TYPE/SAVE'
export const DELETE = 'STATUS_UPDATE/TYPE/DELETE'
export const CREATE = 'STATUS_UPDATE/TYPE/CREATE'
export const CANCEL = 'STATUS_UPDATE/TYPE/CANCEL'

export const REQUEST = 'STATUS_UPDATE/STATUS/REQUEST'
export const SUCCESS = 'STATUS_UPDATE/STATUS/SUCCESS'
export const ERROR = 'STATUS_UPDATE/STATUS/ERROR'

export const EDIT_POST_BEGIN = 'LOCAL_POST/EDIT_POST_BEGIN'
export const EDIT_POST_END = 'LOCAL_POST/EDIT_POST_END'
export const EDIT_COMMENT_BEGIN = 'LOCAL_COMMENT/EDIT_COMMENT_BEGIN'
export const EDIT_COMMENT_END = 'LOCAL_COMMENT/EDIT_COMMENT_END'

export const VOTE_POST_REQUEST = 'VOTE_POST_REQUEST'
export const VOTE_POST_ERROR = 'VOTE_POST_ERROR'
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS'

export const VOTE_COMMENT_REQUEST = 'VOTE_COMMENT_REQUEST'
export const VOTE_COMMENT_ERROR = 'VOTE_COMMENT_ERROR'
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS'

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST'
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST'
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR'
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'

export const NEW_POST_SHOW = 'NEW_POST_SHOW'
export const NEW_POST_HIDE = 'NEW_POST_HIDE'

export const NEW_COMMENT_SHOW = 'NEW_COMMENT_SHOW'
export const NEW_COMMENT_HIDE = 'NEW_COMMENT_HIDE'

export const SORT_BY_VOTES = 'SORT_BY_VOTES'
export const SORT_BY_DATE = 'SORT_BY_DATE'

export const SET_USER = 'SET_USER'
