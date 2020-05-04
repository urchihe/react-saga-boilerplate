import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    homePageLoaded: ['action'],
})
export const HomeTypes = Types
export default Creators