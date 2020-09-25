import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

export const getCurrentUser = (state) => ({
  ...state,
  getcurrentUserIsLoading: true,
  getcurrentUserErrors: null,
})

export const currentUserSuccess = (state, { payload } ) => ({
...state,
user: payload.user,
currentUser: payload.user,
getcurrentUserIsLoading: false,
getcurrentUserErrors: null,
})

export const currentUserError = (state, {error}) => ({
...state,
getcurrentUserIsLoading: false,
getcurrentUserErrors: error,
user: INITIAL_STATE.user,
})

export const login = (state) => ({
    ...state,
    loginIsLoading: true,
    loginErrors: null,
})
  
export const loginSuccess = (state, { payload } ) => ({
    ...state,
    user: payload.user,
    redirectTo: '/',
    token: payload.user.token,
    currentUser: payload.user,
    loginIsLoading: false,
    loginErrors: null,
})
  
  export const loginError = (state, {error}) => ({
    ...state,
    loginIsLoading: false,
    loginErrors: error,
    user: INITIAL_STATE.user,
    redirectTo: INITIAL_STATE.redirectTo,
    token: INITIAL_STATE.token,
    currentUser: INITIAL_STATE.currentUser,
})

export const register = (state) => ({
    ...state,
    registerIsLoading: true,
    registerErrors: null,
})
  
export const registerSuccess = (state, { payload } ) => ({
    ...state,
    user: payload.user,
    redirectTo: '/',
    token: payload.user.token,
    currentUser:payload.user,
    registerIsLoading: false,
    registerErrors: null,
})
  
export const registerError = (state, {error}) => ({
    ...state,
    registerIsLoading: false,
    registerErrors: error,
    user: INITIAL_STATE.user,
    redirectTo: INITIAL_STATE.redirectTo,
    token: INITIAL_STATE.token,
    currentUser: INITIAL_STATE.currentUser,
})

export const save = (state, { user }) => ({
    ...state,
    user: user.user,
    currentUser: user.user,
    saveIsLoading: true,
    saveErrors: null,
})
  
export const saveSuccess = (state, { user } ) => ({
    ...state,
    user: user.user,
    redirectTo: '/',
    currentUser: user.user,
    saveIsLoading: false,
    saveErrors: null,
})
  
export const saveError = (state, {error}) => ({
    ...state,
    saveIsLoading: false,
    saveErrors: error,
    user: INITIAL_STATE.user,
    redirectTo: INITIAL_STATE.redirectTo,
    currentUser: INITIAL_STATE.currentUser,
})

export const logout = (state) => ({
    ...state,
    getcurrentUserIsLoading: true,
    getcurrentUserErrors: null,
})
  
export const logoutSuccess = (state) => ({
    ...state,
    redirectTo: '/',
    token: null,
    currentUser: {},
    logoutIsLoading: false,
    logoutErrors: null,
    user: {}
})
  
export const logoutError = (state, {error}) => ({
    ...state,
    redirectTo: INITIAL_STATE.redirectTo,
    token: INITIAL_STATE.token,
    currentUser: INITIAL_STATE.currentUser,
    logoutIsLoading: false,
    logoutErrors: error,
})

export const setToken = (state, {token}) => ({
    ...state,
  token: token,
})

export const updateFieldAuth = (state, {action}) => ({
    ...state,
[action.key]: action.value
})

export const asyncStart = (state) => ({
    ...state,
inProgress: true 
})
export const asyncEnd = (state) => ({
    ...state,
inProgress: false
})


export const redirect = (state) => ({
    ...state,
    redirectTo: null,
  })

export const reducer = createReducer(INITIAL_STATE, {
    [AuthTypes.GET_CURRENT_USER]: getCurrentUser,
    [AuthTypes.CURRENT_USER_SUCCESS]: currentUserSuccess,
    [AuthTypes.CURRENT_USER_ERROR]: currentUserError,
    [AuthTypes.LOGIN]: login,
    [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
    [AuthTypes.LOGIN_ERROR]: loginError,
    [AuthTypes.REGISTER]: register,
    [AuthTypes.REGISTER_SUCCESS]: registerSuccess,
    [AuthTypes.REGISTER_ERROR]: registerError,
    [AuthTypes.SAVE]: save,
    [AuthTypes.SAVE_SUCCESS]: saveSuccess,
    [AuthTypes.SAVE_ERROR]: saveError,
    [AuthTypes.SET_TOKEN]: setToken,
    [AuthTypes.UPDATE_FIELD_AUTH]: updateFieldAuth,
    [AuthTypes.ASYNC_START]: asyncStart,
    [AuthTypes.ASYNC_END]: asyncEnd,
    [AuthTypes.LOGOUT]: logout,
    [AuthTypes.LOGOUT_SUCCESS]: logoutSuccess,
    [AuthTypes.LOGOUT_ERROR]: logoutError,
    [AuthTypes.REDIRECT]: redirect,
  })
  