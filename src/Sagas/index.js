import { takeLatest, all } from 'redux-saga/effects'
import { ArticleTypes } from '../Stores/Article/Actions'
import { AuthTypes } from '../Stores/Auth/Actions'
import { ProfileTypes } from '../Stores/Profile/Actions'
import { CommentTypes } from '../Stores/Comment/Actions'
import { TagTypes } from '../Stores/Tag/Actions'

import { 
  getArticles,
  getArticlesByAuthor,
  getArticlesByTag,
  deleteArticle,
  setFavoriteArticle,
  getFavouritedByArticle,
  getFeed,
  getArticle,
  unfavoriteArticle,
  updateArticle,
  createArticle } from './ArticleSaga'
import { 
  getCurrentUser,
  login,
  register,
  save } from './AuthSaga'
import { 
  createComment,
  deleteComment,
  getArticleComments } from './CommentSaga'
import { 
  followUser,
  getProfile,
  unfollowUser } from './ProfileSaga'
import { getTags } from './TagSaga'


export default function* root() {
  yield all([
    takeLatest(ArticleTypes.GET_ARTICLES, getArticles),
    takeLatest(ArticleTypes.GET_ARTICLES_BY_AUTHOR, getArticlesByAuthor),
    takeLatest(ArticleTypes.GET_ARTICLES_BY_TAG, getArticlesByTag),
    takeLatest(ArticleTypes.DELETE_ARTICLE, deleteArticle),
    takeLatest(ArticleTypes.SET_FAVOURITE_ARTICLE, setFavoriteArticle),
    takeLatest(ArticleTypes.GET_FAVOURITED_BY_ARTICLE, getFavouritedByArticle),
    takeLatest(ArticleTypes.GET_FEED, getFeed),
    takeLatest(ArticleTypes.GET_ARTICLE, getArticle),
    takeLatest(ArticleTypes.UNFAVOURITE_ARTICLE, unfavoriteArticle),
    takeLatest(ArticleTypes.UPDATE_ARTICLE, updateArticle),
    takeLatest(ArticleTypes.CREATE_ARTICLE, createArticle),

    takeLatest(AuthTypes.GET_CURRENT_USER, getCurrentUser),
    takeLatest(AuthTypes.LOGIN, login),
    takeLatest(AuthTypes.REGISTER, register),
    takeLatest(AuthTypes.SAVE, save),

    takeLatest(CommentTypes.CREATE_COMMENT, createComment),
    takeLatest(CommentTypes.DELETE_COMMENT, deleteComment),
    takeLatest(CommentTypes.GET_ARTICLE_COMMENTS, getArticleComments),

    takeLatest(ProfileTypes.FOLLOW_USER, followUser),
    takeLatest(ProfileTypes.GET_PROFILE, getProfile),
    takeLatest(ProfileTypes.UNFOLLOW_USER, unfollowUser),

    takeLatest(TagTypes.GET_TAGS, getTags),

  ])
}