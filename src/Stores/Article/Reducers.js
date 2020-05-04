import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ArticleTypes } from './Actions'

export const getArticles = (state) => ({
  ...state,
  articlesIsLoading: true,
  articlesErrors: null,
})

export const articlesSuccess = (state, { payload }) => ({
  ...state,
  articles: payload.articles,
  articlesCount: payload.articlesCount,
  articlesIsLoading: false,
  articlesErrors: null,
})

export const articlesError = (state, errors) => ({
  ...state,
  articlesIsLoading: false,
  articlesErrors: errors,
  articles: INITIAL_STATE.articles,
})

export const getArticle = (state) => ({
  ...state,
  articleIsLoading: true,
  articleErrors: null,
})

export const articleSuccess = (state, { article }) => ({
    ...state,
    articles: INITIAL_STATE.articles,
    article: article,
    articleIsLoading: false,
    articleErrors: null,
  })
  
export const articleError = (state, {errors}) => ({
...state,
articleIsLoading: false,
articleErrors: errors,
article: INITIAL_STATE.article,
})
  
export const resetAll = () => ({
  ...INITIAL_STATE,
})

export const getArticlesByAuthor = (state) => ({
    ...state,
    articlesByAuthorIsLoading: true,
    articlesByAuthorErrors: null,
  })
  
export const articlesByAuthorSuccess = (state, { articles }) => ({
    ...state,
    articles: state.articles.length <= 0 ? articles : state.articles.concat(articles),
    articlesByAuthorIsLoading: false,
    articlesByAuthorErrors: null,
})
    
export const articlesByAuthorError = (state, {errors}) => ({
    ...state,
    articlesByAuthorIsLoading: false,
    articlesByAuthorErrors: errors,
    articles: INITIAL_STATE.articles,
})

export const getArticlesByTag = (state) => ({
    ...state,
    articlesByTagIsLoading: true,
    articlesByTagErrors: null,
  })
  
export const articlesByTagSuccess = (state, { payload }) => ({
    ...state,
    articles: payload.articles,
    articlesCount: payload.articlesCount,
    articlesByTagIsLoading: false,
    articlesByTagErrors: null,
})
    
export const articlesByTagError = (state, {errors}) => ({
    ...state,
    articlesByTagIsLoading: false,
    articlesByTagErrors: errors,
    articles: INITIAL_STATE.articles,
})

export const deleteArticle = (state) => ({
    ...state,
    deleteArticleIsLoading: true,
    deleteArticleErrors: null,
  })
  
export const deleteArticleSuccess = (state) => ({
    ...state,
    deleteArticleIsLoading: false,
    deleteArticleErrors: null,
    redirectTo: '/',
})
    
export const deleteArticleError = (state, {errors}) => ({
    ...state,
    deleteArticleIsLoading: false,
    deleteArticleErrors: errors,
    articles: INITIAL_STATE.articles,
    redirectTo: INITIAL_STATE.redirectTo,
})

export const setFavouriteArticle = (state, { slug }) => ({
    ...state,
    slug: slug,
    setFavouriteArticleIsLoading: true,
    setFavouriteArticleErrors: null,
  })
  
export const favouriteArticleSuccess = (state, { payload }) => ({
    ...state,
    articles: state.articles.map(article => {
      if (article.slug === payload.article.slug) {
        return {
          ...article,
          favorited: payload.article.favorited,
          favoritesCount: payload.article.favoritesCount
        };
      }
      return article;
    }),
    setFavouriteArticleIsLoading: false,
    setFavouriteArticleErrors: null,
})
    
export const favouriteArticleError = (state, {error}) => ({
    ...state,
    setFavouriteArticleIsLoading: false,
    setFavouriteArticleErrors: error,
})

export const getFavouritedByArticle = (state) => ({
    ...state,
    getFavouritedByIsLoading: true,
    getFavouritedByErrors: null,
  })
  
export const favouritedByArticleSuccess = (state) => ({
    ...state,
    getFavouritedByIsLoading: false,
    getFavouritedByErrors: null,
})
    
export const favouritedByArticleError = (state, {errors}) => ({
    ...state,
    getFavouritedByIsLoading: false,
    getFavouritedByErrors: errors,
})

export const getFeed = (state) => ({
    ...state,
    getFeedIsLoading: true,
    getFeedErrors: null,
  })
  
export const feedSuccess = (state) => ({
    ...state,
    getFeedIsLoading: false,
    getFeedErrors: null,
})
    
export const feedError = (state, {errors}) => ({
    ...state,
    getFeedIsLoading: false,
    getFeedErrors: errors,
})

export const unfavouriteArticle = (state) => ({
    ...state,
    unfavoriteArticleIsLoading: true,
    unfavoriteArticleErrors: null,
  })
  
export const unfavouriteArticleSuccess = (state,{ payload }) => ({
    ...state,
    articles: state.articles.map(article => {
      if (article.slug === payload.article.slug) {
        return {
          ...article,
          favorited: payload.article.favorited,
          favoritesCount: payload.article.favoritesCount
        };
      }
      return article;
    }),
    unfavoriteArticleIsLoading: false,
    unfavoriteArticleErrors: null,
})
    
export const unfavouriteArticleError = (state, {errors}) => ({
    ...state,
    unfavoriteArticleIsLoading: false,
    unfavoriteArticleErrors: errors,
})

export const updateArticle = (state) => ({
    ...state,
    updateArticleIsLoading: true,
    updateArticleErrors: null,
  })
  
export const updateArticleSuccess = (state) => ({
    ...state,
    updateArticleIsLoading: false,
    updateArticleErrors: null,
})
    
export const updateArticleleError = (state, {errors}) => ({
    ...state,
    updateArticleIsLoading: false,
    updateArticleErrors: errors,
})

export const createArticle = (state) => ({
    ...state,
    createArticleIsLoading: true,
    createArticleErrors: null,
  })
  
export const createArticleSuccess = (state,{article}) => ({
    ...state,
    redirectTo: `/article/${article.slug}`,
    createArticleIsLoading: false,
    createArticleErrors: null,
})
    
export const createArticleleError = (state, {errors}) => ({
    ...state,
    createArticleIsLoading: false,
    createArticleErrors: errors,
})

export const setPage = (state,{ payload }) => ({
  ...state,
  articles: payload.articles,
  articlesCount: payload.articlesCount,
  currentPage:  payload.page
})

export const applyTagFilter = (state, {action}) => ({
  ...state,
  pager: action.pager,
  articles: action.payload.articles,
  articlesCount: action.payload.articlesCount,
  tab: null,
  tag: action.tag,
  currentPage: 0
})

export const homePageLoaded = (state, {action}) => ({
  ...state,
  pager: action.pager,
  tags: action.payload[0].tags,
  articles: action.payload[1].articles,
  articlesCount: action.payload[1].articlesCount,
  currentPage: 0,
  tab: action.tab
})

export const changeTabs = (state, {action}) => ({
  ...state,
  pager: action.pager,
  articles: action.payload.articles,
  articlesCount: action.payload.articlesCount,
  tab: action.tab,
  currentPage: 0,
  tag: null
})
export const profilePageLoaded = (state, {action}) => ({
  ...state,
  pager: action.pager,
  articles: action.payload[1].articles,
  articlesCount: action.payload[1].articlesCount,
  currentPage: 0
})

export const reducer = createReducer(INITIAL_STATE, {
  [ArticleTypes.GET_ARTICLES]: getArticles,
  [ArticleTypes.ARTICLES_SUCCESS]: articlesSuccess,
  [ArticleTypes.ARTICLES_ERROR]: articlesError,
  [ArticleTypes.GET_ARTICLE]: getArticle,
  [ArticleTypes.ARTICLE_SUCCESS]: articleSuccess,
  [ArticleTypes.ARTICLE_ERROR]: articleError,
  [ArticleTypes.GET_ARTICLES_BY_AUTHOR]: getArticlesByAuthor,
  [ArticleTypes.ARTICLES_BY_AUTHOR_SUCCESS]: articlesByAuthorSuccess,
  [ArticleTypes.ARTICLES_BY_AUTHOR_ERROR]: articlesByAuthorError,
  [ArticleTypes.GET_ARTICLES_BY_TAG]: getArticlesByTag,
  [ArticleTypes.ARTICLES_BY_TAG_SUCCESS]: articlesByTagSuccess,
  [ArticleTypes.ARTICLES_BY_TAG_ERROR]: articlesByTagError,
  [ArticleTypes.DELETE_ARTICLE]: deleteArticle,
  [ArticleTypes.DELETE_ARTICLE_SUCCESS]: deleteArticleSuccess,
  [ArticleTypes.DELETE_ARTICLE_ERROR]: deleteArticleError,
  [ArticleTypes.SET_FAVOURITE_ARTICLE]: setFavouriteArticle,
  [ArticleTypes.FAVOURITE_ARTICLE_SUCCESS]: favouriteArticleSuccess,
  [ArticleTypes.FAVOURITE_ARTICLE_ERROR]: favouriteArticleError,
  [ArticleTypes.GET_FAVOURITED_BY_ARTICLE]: getFavouritedByArticle,
  [ArticleTypes.FAVOURITED_BY_ARTICLE_SUCCESS]: favouritedByArticleSuccess,
  [ArticleTypes.FAVOURITED_BY_ARTICLE_ERROR]: favouritedByArticleError,
  [ArticleTypes.UNFAVOURITE_ARTICLE]: unfavouriteArticle,
  [ArticleTypes.UNFAVOURITE_ARTICLE_SUCCESS]: unfavouriteArticleSuccess,
  [ArticleTypes.UNFAVOURITE_ARTICLE_ERROR]: unfavouriteArticleError,
  [ArticleTypes.GET_FEED]: getFeed,
  [ArticleTypes.FEED_SUCCESS]: feedSuccess,
  [ArticleTypes.FEED_ERROR]: feedError,
  [ArticleTypes.UPDATE_ARTICLE]: updateArticle,
  [ArticleTypes.UPDATE_ARTICLE_SUCCESS]: updateArticleSuccess,
  [ArticleTypes.UPDATE_ARTICLE_ERROR]: updateArticleleError,
  [ArticleTypes.CREATE_ARTICLE]: createArticle,
  [ArticleTypes.CREATE_ARTICLE_SUCCESS]: createArticleSuccess,
  [ArticleTypes.CREATE_ARTICLE_ERROR]: createArticleleError,
  [ArticleTypes.SET_PAGE]: setPage,
  [ArticleTypes.APPLY_TAG_FILTER]: applyTagFilter,
  [ArticleTypes.HOME_PAGE_LOADED]: homePageLoaded,
  [ArticleTypes.CHANGE_TABS]: changeTabs,
  [ArticleTypes.PROFILE_PAGE_LOADED]: profilePageLoaded
})
