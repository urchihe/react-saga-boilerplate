  export const INITIAL_STATE = {
    articles: [],
    article: {},
    feeds: [],
    articlesIsLoading: false,
    articlesError: null,
    articleIsLoading: false,
    articleError: null,
    articlesByAuthorIsLoading: false,
    articlesByAuthorErrors: null,
    articlesByTagIsLoading: false,
    articlesByTagErrors: null,
    deleteArticleIsLoading: false,
    deleteArticleErrors: null,
    getFavouritedByIsLoading: false,
    getFavouritedByErrors: null,
    getFeedIsLoading: false,
    getFeedErrors: null,
    unfavoriteArticleIsLoading: false,
    unfavoriteArticleErrors: null,
    updateArticleIsLoading: false,
    createArticleIsLoading: false,
    createArticleErrors: null,
    redirectTo: null,
    currentPage: 0,
    articlesCount: 0,
    tab: 'feed',
    pager: null,
    tags: [],
    tag: null
  }
  