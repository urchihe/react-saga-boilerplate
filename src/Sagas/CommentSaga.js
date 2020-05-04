import { put, call} from 'redux-saga/effects'
import CommentActions from '../Stores/Comment/Actions'
//import CommonActions from 'App/Stores/Common/Actions'
import { CommentService } from '../Services/Api'
//import { parseErrors } from 'App/Services/ApiService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
// get the current user
export function* createComment() {
  const response = yield call(CommentService.createComment)
  if (response.ok === true) {
    yield put(CommentActions.createCommentSuccess(response.data))
    return
  }
  yield put(CommentActions.createCommentError(response.data))
}

// get the current user
export function* deleteComment({slug, commentId}) {
  const response = yield call(CommentService.deleteComment,{slug, commentId})
  if (response.ok === true) {
    yield put(CommentActions.deleteCommentSuccess(response.data))
    return
  }
  yield put(CommentActions.deleteCommentError(response.data))
}

// get the current user
export function* getArticleComments({slug}) {
  const response = yield call(CommentService.getArticleComments,{ slug })
  if (response.ok === true) {
    console.log(response.data)
    yield put(CommentActions.articleCommentsSuccess(response.data))
    return
  }
  yield put(CommentActions.articleCommentsError(response.data))
}