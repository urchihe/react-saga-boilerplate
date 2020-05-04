import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    editorPageLoaded: ['action'],
    articleSubmitted: null,
    articleSubmittedSuccess: ['action'],
    articleSubmittedError: ['error'],
    addTag: null,
    removeTag: ['action'],
    updateFieldEditor: ['action'],
})
export const EditorTypes = Types
export default Creators