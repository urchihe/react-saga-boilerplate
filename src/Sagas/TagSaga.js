import { put, call} from 'redux-saga/effects'
import TagActions from '../Stores/Tag/Actions'
//import CommonActions from 'App/Stores/Common/Actions'
import { TagService } from '../Services/Api'
//import { parseErrors } from 'App/Services/ApiService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
// get the current user

export function* getTags() {
  const response = yield call(TagService.getTags)
  if (response.ok === true) {
   yield put(TagActions.getTagsSuccess(response.data.tags))
   return
  }
  yield put(TagActions.getTagsError("uchenna"))
}