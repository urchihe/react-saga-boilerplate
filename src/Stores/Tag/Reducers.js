import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { TagTypes } from './Actions'

export const getTags = (state) => ({
  ...state,
  getTagsIsLoading: true,
  getTagsErrors: null,
})

export const getTagsSuccess = (state, {tags}) => ({
    ...state,
    tags: tags,
    getTagsIsLoading: false,
    getTagsErrors: null,
})

export const getTagsError = (state, { error }) => ({
    ...state,
    getTagsIsLoading: false,
    getTagsErrors: error,
})

export const reducer = createReducer(INITIAL_STATE, {
    [TagTypes.GET_TAGS]: getTags,
    [TagTypes.GET_TAGS_SUCCESS]: getTagsSuccess,
    [TagTypes.GET_TAGS_ERROR]: getTagsError
    
  })
  