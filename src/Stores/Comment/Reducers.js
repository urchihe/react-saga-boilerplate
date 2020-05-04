import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { CommentTypes } from './Actions'

export const createComment = (state) => ({
  ...state,
  createCommenIsLoading: true,
  createCommenErrors: null,
})

export const createCommentSuccess = (state) => ({
    ...state,
    createCommenIsLoading: false,
    createCommenErrors: null,
})

  export const createCommentError = (state,{error}) => ({
    ...state,
    createCommenIsLoading: false,
    createCommentErrors: error,
})

export const deleteComment = (state) => ({
    ...state,
    deleteCommentIsLoading: true,
    deleteCommentErrors: null,
  })
  
  export const deleteCommentSuccess = (state, {commentId}) => ({
      ...state,
      comments: state.comment.filter(comment => comment.id !== commentId),
      deleteCommentIsLoading: false,
      deleteCommentErrors: null,
  })
  
    export const deleteCommentError = (state, {error} ) => ({
      ...state,
      deleteCommentIsLoading: false,
      deleteCommentErrors: error,
  })

export const getArticleComments = (state) => ({
    ...state,
    getArticleCommentsIsLoading: true,
    getArticleCommentsErrors: null,
})
  
export const articleCommentsSuccess = (state,{comments}) => ({
    ...state,
    comments: comments,
    getArticleCommentsIsLoading: false,
    getArticleCommentsErrors: null,
})
  
export const articleCommentsError = (state,{error}) => ({
    ...state,
    getArticleCommentsIsLoading: false,
    getArticleCommentsErrors: error,
    comments: INITIAL_STATE.comments,
})



export const reducer = createReducer(INITIAL_STATE, {
    [CommentTypes.CREATE_COMMENT]: createComment,
    [CommentTypes.CREATE_COMMENT_SUCCESS]: createCommentSuccess,
    [CommentTypes.CREATE_COMMENT_ERROR]: createCommentError,
    [CommentTypes.DELETE_COMMENT]: deleteComment,
    [CommentTypes.DELETE_COMMENT_SUCCESS]: deleteCommentSuccess,
    [CommentTypes.DELETE_COMMENT_ERROR]: deleteCommentError,
    [CommentTypes.GET_ARTICLE_COMMENTS]: getArticleComments,
    [CommentTypes.ARTICLE_COMMENTS_SUCCESS]: articleCommentsSuccess,
    [CommentTypes.ARTICLE_COMMENTS_ERROR]: articleCommentsError,
  })
  