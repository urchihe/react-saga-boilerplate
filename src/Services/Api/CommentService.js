import { ApiService } from '../ApiService'


function createComment(slug, comment) {
  console.log({comment})
  return ApiService.post(`/articles/${slug}/comments`,{ comment })
}

function deleteComment(slug , commentId) {
    return ApiService.delete(`/articles/${slug}/comments`, { commentId })
}

function getArticleComments(slug) {
    return ApiService.get(`/articles/${slug}/comments`)
}

export const CommentService = {
    createComment,
    deleteComment,
    getArticleComments,
  }
  