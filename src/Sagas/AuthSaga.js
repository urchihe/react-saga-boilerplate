import { put, call} from 'redux-saga/effects'
import AuthActions from '../Stores/Auth/Actions'
//import CommonActions from 'App/Stores/Common/Actions'
import { AuthService } from '../Services/Api'
//import { parseErrors } from 'App/Services/ApiService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
// get the current user
export function* getCurrentUser() {
  const response = yield call(AuthService.getCurrentUser)
  if (response.ok === true) {
    yield put(AuthActions.currentUserSuccess(response.data))
    return
  }
  yield put(AuthActions.currentUserError(response.data))
}

// login user
export function* login({email,password}) {
  const response = yield call(AuthService.login,{email,password})
  if (response.ok === true) {
    yield put(AuthActions.loginSuccess(response.data))
    return
  }
  yield put(AuthActions.loginError(response.data))
}

// register new user
export function* register({username,email,password}) {
  const response = yield call(AuthService.register,{username,email,password})
  if (response.ok === true) {
    yield put(AuthActions.registerSuccess(response.data))
    return
  }
  yield put(AuthActions.registerError(response.data))
}

// register new user
export function* save({user}) {
  const response = yield call(AuthService.save,{user})
  if (response.ok === true) {
    yield put(AuthActions.saveSuccess(response.data))
    return
  }
  yield put(AuthActions.saveError(response.data))
}

// logout user
export function* logout() {
    yield put(AuthActions.logoutSuccess())
    return
}