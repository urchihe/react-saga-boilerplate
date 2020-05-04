import { ApiService } from '../ApiService'

const omitSlug = article => Object.assign({}, article, { slug: undefined })
const COUNT = 10

function getArticles(page) {
  return ApiService.get('/articles', {
    limit: COUNT,
    offset: page ? page * COUNT : 0
  })
}

function getArticlesByAuthor(author,page) {
  return ApiService.get('/articles', {
    author: author,
    limit: COUNT,
    offset: page ? page * COUNT : 0
  })
}

function getArticlesByTag(tag,page) {
  return ApiService.get('/articles', {
    tag: tag,
    limit: COUNT,
    offset: page ? page * COUNT : 0
  })
}

function deleteArticle(slug) {
  return ApiService.delete(`/articles/${slug}`)
}

function setFavoriteArticle(slug) {
  return ApiService.post(`/articles/${slug}/favorite`)
}

function getFavouritedByArticle(author, page) {
  return ApiService.get('/articles',{
    author: author,
    limit: COUNT,
    offset: page ? page * COUNT : 0
  })
}

function getFeed() {
  return ApiService.get('/articles/feed',{
    limit: COUNT,
    offset: 0
  })
}

function getArticle(slug) {
  return ApiService.get(`/articles/${slug}`)
}

function unfavoriteArticle(slug) {
  return ApiService.delete(`/articles/${slug}/favorite`)
}

function updateArticle(article) {
  return ApiService.put(`/articles/${article.slug}`,{
    article: omitSlug(article)
  })
}

function createArticle(article) {
  return ApiService.post('/articles',{article})
}

export const ArticleService = {
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
  createArticle
}
