import { put, call} from 'redux-saga/effects'
import ArticleActions from '../Stores/Article/Actions'
import { ArticleService } from '../Services/Api'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
// get all Articles
export function* getArticles({ page }) {
  const response = yield call(ArticleService.getArticles,page)
  if (response.ok === true) {
    console.log(response.data)
    yield put(ArticleActions.articlesSuccess(response.data))
    return
  }
  yield put(ArticleActions.articlesError(response.data))
}

// get article by author
export function* getArticlesByAuthor({ author, page }) {
  const response = yield call(ArticleService.getArticlesByAuthor,author,page)
 // const state = yield select()
  if (response.ok === true) {
    yield put(ArticleActions.getArticlesByAuthorSuccess(response.data))
    return
  }
  yield put(ArticleActions.getArticlesByAuthorError(response.data))
}

// get article by tag
export function* getArticlesByTag({ tag,page }) {
  const response = yield call(ArticleService.getArticlesByTag,tag,page)
  // const state = yield select()
  if (response.ok === true) {
    yield put(ArticleActions.articlesByTagSuccess(response.data))
    return
  }
  yield put(ArticleActions.articlesByTagError(response.data))
}

// delete article by slug
export function* deleteArticle({ slug }) {
  const response = yield call(ArticleService.deleteArticle,slug)
   // const state = yield select()
  if (response.ok === true) {
    yield put(ArticleActions.deleteArticleSuccess(response.data))
    return
  }
  yield put(ArticleActions.deleteArticleError(response.data))
}

// delete article by slug
export function* setFavoriteArticle({ slug }) {
  const response = yield call(ArticleService.setFavoriteArticle,slug)
  // const state = yield select()
  if (response.ok === true) {
    yield put(ArticleActions.favouriteArticleSuccess(response.data))
    return
  }
  yield put(ArticleActions.favouriteArticleError(response.data))
}

// delete article by slug
export function* getFavouritedByArticle({ author, page }) {
  const response = yield call(ArticleService.getFavouritedByArticle, {author, page})
  // const state = yield select()
  if (response.ok === true) {
    yield put(ArticleActions.getArticleFavoritedBySuccess(response.data))
    return
    }
  yield put(ArticleActions.getArticleFavoritedByError(response.data))
}

// delete article by slug
export function* getFeed() {
  const response = yield call(ArticleService.getFeed)
  if (response.ok === true) {
    yield put(ArticleActions.feedSuccess(response.data))
    return
  }
  yield put(ArticleActions.feedError(response.data)) 
}

// delete article by slug
export function* getArticle({ slug }) {
  const response = yield call(ArticleService.getArticle,{slug})
  // const state = yield select()
  if (response.ok === true) {
    console.log(response.data)
    yield put(ArticleActions.articleSuccess(response.data))
    return
  }
  yield put(ArticleActions.articleError(response.data))
}

// delete article by slug
export function* unfavoriteArticle({ slug }) {
  const response = yield call(ArticleService.unfavoriteArticle,slug)
  if (response.ok === true) {
    yield put(ArticleActions.unfavouriteArticleSuccess(response.data))
    return
  }
  yield put(ArticleActions.unfavouriteArticleError(response.data))
}

// delete article by slug
export function* updateArticle({ article }) {
  const response = yield call(ArticleService.updateArticle, {article})
  // const state = yield select()
  if (response.ok === true) {
    yield put(ArticleActions.updateArticleSuccess(response.data))
    return
  }
    yield put(ArticleActions.updateArticleError(response.data))
}

// delete article by slug
export function* createArticle({ article }) {
  const response = yield call(ArticleService.createArticle, {article})
  // const state = yield select()
  if (response.ok === true) {
    yield put(ArticleActions.createArticleSuccess(response.data))
    return
  }
  yield put(ArticleActions.createArticleError(response.data))
}