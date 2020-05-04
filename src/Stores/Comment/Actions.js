import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    createComment: ['slug','comment'],
    createCommentSuccess: ['commentId'],
    createCommentError: ['error'],
    deleteComment: ['slug','commentId'],
    deleteCommentSuccess: ['comment'],
    deleteCommentError: ['error'],
    getArticleComments: ['slug'],
    articleCommentsSuccess: ['comments'],
    articleCommentsError: ['error']
})
export const CommentTypes = Types
export default Creators