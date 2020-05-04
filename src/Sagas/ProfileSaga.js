import { put, call} from 'redux-saga/effects'
import ProfileActions from '../Stores/Comment/Actions'
//import CommonActions from 'App/Stores/Common/Actions'
import { ProfileService } from '../Services/Api'
//import { parseErrors } from 'App/Services/ApiService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
// get the current user
export function* followUser( {username}) {
  const response = yield call(ProfileService.followUser,{username})
  if (response.ok === true) {
    yield put(ProfileActions.followUserSuccess(response.data))
    return
  }
    yield put(ProfileActions.followUsertError(response.data))
}

// get the current user
export function* getProfile({username}) {
  const response = yield call(ProfileService.getProfile,{username})
  if (response.ok === true) {
    yield put(ProfileActions.getProfileSuccess(response.data))
    return
  }
  yield put(ProfileActions.getProfileError(response.data))
}

// get the current user
export function* unfollowUser({username}) {
  const response = yield call(ProfileService.unfollowUser,{username})
  if (response.ok === true) {
    yield put(ProfileActions.unfollowUserSuccess(response.data))
    return
  }
  yield put(ProfileActions.unfollowUserError(response.data))
}