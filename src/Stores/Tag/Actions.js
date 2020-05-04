import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    getTags: null,
    getTagsSuccess: ['tags'],
    getTagsError: ['error'],
})
export const TagTypes = Types
export default Creators