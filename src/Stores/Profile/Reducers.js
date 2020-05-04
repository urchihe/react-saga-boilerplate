import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ProfileTypes } from './Actions'

export const followUser = (state) => ({
  ...state,
  followUserIsLoading: true,
  followUserErrors: null,
})

export const followUserSuccess = (state, {action}) => ({
    ...state,
    ...action.payload.profile,
    followUserIsLoading: false,
    followUserErrors: null,
})
export const followUserError = (state, {error}) => ({
    ...state,
    followUserIsLoading: false,
    followUserErrors: error,
})

export const getProfile = (state) => ({
    ...state,
    getProfileIsLoading: true,
    getProfileErrors: null,
})
  
export const profileSuccess = (state, { profile }) => ({
    ...state,
    profile : profile,
    getProfileIsLoading: false,
    getProfileErrors: null,
})

export const profileError = (state, {error}) => ({
    ...state,
    getProfileIsLoading: false,
    getProfileErrors: error,
})

export const unfollowUser = (state) => ({
    ...state,
    unfollowUserIsLoading: true,
    unfollowUserErrors: null,
})
  
export const unfollowUserSuccess = (state,{action}) => ({
    ...state,
    ...action.payload.profile,
    unfollowUserIsLoading: false,
    unfollowUserErrors: null,
})

export const unfollowUserError = (state, {error}) => ({
    ...state,
    unfollowUserIsLoading: false,
    unfollowUserErrors: error,
})

export const profilePageLoaded = (state, {action}) => ({
    ...state,
    ...action.payload[0].profile
})

export const reducer = createReducer(INITIAL_STATE, {
    [ProfileTypes.FOLLOW_USER]: followUser,
    [ProfileTypes.FOLLOW_USER_SUCCESS]: followUserSuccess,
    [ProfileTypes.FOLLOW_USER_ERROR]: followUserError,
    [ProfileTypes.GET_PROFILE]: getProfile,
    [ProfileTypes.PROFILE_SUCCESS]: profileSuccess,
    [ProfileTypes.PROFILE_ERROR]: profileError,
    [ProfileTypes.PROFILE_PAGE_LOADED]: profilePageLoaded,
  })
  