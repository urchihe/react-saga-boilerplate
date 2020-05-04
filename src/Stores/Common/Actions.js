import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    appLoad: ['user','token','skipTracking'],
    redirect: null,
    pageUnloaded: null,
})
export const CommonTypes = Types
export default Creators