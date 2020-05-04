import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getArticles: ['page'],
  articlesSuccess: ['payload'],
  articlesError: ['error'],
  getArticle: ['slug'],
  articleSuccess: ['article'],
  articleError: ['error'],
  getArticlesByAuthor: ['author','page'],
  articlesByAuthorSuccess: ['username'],
  articlesByAuthorError: ['error'],
  getArticlesByTag: ['tag','page'],
  articlesByTagSuccess: ['payload'],
  articlesByTagError: ['error'],
  deleteArticle: ['slug'],
  deleteArticleSuccess: null,
  deleteArticleError: ['error'],
  setFavouriteArticle: ['slug'],
  favouriteArticleSuccess: ['payload'],
  favouriteArticleError: ['error'],
  getFavouritedByArticle: ['author','page'],
  favouritedByArticleSuccess: null,
  favouritedByArticleError: ['error'],
  getFeed: ['quote'],
  feedSuccess: ['feeds'],
  feedError: ['error'],
  unfavouriteArticle: ['slug'],
  unfavouriteArticleSuccess: ['payload'],
  unfavouriteArticleError: ['error'],
  updateArticle: ['slug','article'],
  updateArticleSuccess: ['message'],
  updateArticleError: ['error'],
  createArticle: ['article'],
  createArticleSuccess: ['message'],
  createArticleError: ['error'],
  setPage: ['payload'],
  applyTagFilter: ['action'],
  homePageLoaded: ['action'],
  changeTabs: ['action'],
  profilePageLoaded: ['action']
})

export const ArticleTypes = Types
export default Creators
