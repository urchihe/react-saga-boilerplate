import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { EditorTypes } from './Actions'

export const editorPageLoaded = (state, { action }) => ({
  ...state,
  articleSlug: action.payload ? action.payload.article.slug : '',
  title: action.payload ? action.payload.article.title : '',
  description: action.payload ? action.payload.article.description : '',
  body: action.payload ? action.payload.article.body : '',
  tagInput: '',
  tagList: action.payload ? action.payload.article.tagList : []
 
})
export const articleSubmitted = (state) => ({
  ...state,
  inProgress: true,
  articleSubmittedIsLoading: true,
  articleSubmittedErrors: null,
})
export const articleSubmittedSuccess = (state, { action }) => ({
  ...state,
  inProgress: null,
  articleSubmittedIsLoading: false,
  articleSubmittedErrors: action.payload.errors,
})
export const articleSubmittedError = (state, { action }) => ({
  ...state,
  inProgress: null,
  articleSubmittedIsLoading: false,
  articleSubmittedErrors: action.payload.errors,
})

export const addTag = (state) => ({
  ...state,
  tagList: state.tagList.concat([state.tagInput]),
  tagInput: ''
})

export const removeTag = (state, {action}) => ({
  ...state,
  tagList: state.tagList.filter(tag => tag !== action.tag)
})

export const updateFieldEditor = (state, {action}) => ({
  ...state,
  [action.key]: action.value 
})


export const reducer = createReducer(INITIAL_STATE, {
    [EditorTypes.EDITOR_PAGE_LOADED]: editorPageLoaded,
    [EditorTypes.ARTICLE_SUBMITTED]: articleSubmitted,
    [EditorTypes.ARTICLE_SUBMITTED_SUCCESS]: articleSubmittedSuccess,
    [EditorTypes.ARTICLE_SUBMITTED_ERROR]: articleSubmittedError,
    [EditorTypes.ADD_TAG]: addTag,
    [EditorTypes.REMOVE_TAG]: removeTag,
    [EditorTypes.UPDATE_FIELD_EDITOR]: updateFieldEditor,
  })