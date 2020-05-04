import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    followUser: ['username'],
    followUserSuccess: null,
    followUserError: ['error'],
    getProfile: ['username'],
    profileSuccess: ['profile'],
    profileError: ['error'],
    unfollowUser: ['username'],
    unfollowUserSucess: null,
    unfollowUserError: ['error'],
    profilePageLoaded: ['action'],
})
export const ProfileTypes = Types
export default Creators