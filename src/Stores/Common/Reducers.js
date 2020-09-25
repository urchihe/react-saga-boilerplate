import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { CommonTypes } from './Actions'

export const appLoad = (state, {user, token, skipTracking} ) => ({
  ...state,
  token: token,
  appLoaded: true,
  currentUser: user,
  skipTracking: skipTracking
})

export const redirect = (state) => ({
  ...state,
  redirectTo: null,
})

export const pageUnloaded = (state) => ({
  ...state,
  viewChangeCounter: INITIAL_STATE.redirectTo + 1,
})


export const reducer = createReducer(INITIAL_STATE, {
    [CommonTypes.APP_LOAD]: appLoad,
    [CommonTypes.REDIRECT]: redirect,
    [CommonTypes.PAGE_UNLOADED]: pageUnloaded,
  })
  